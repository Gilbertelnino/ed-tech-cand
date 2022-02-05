import _ from "lodash";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
  FiberManualRecord as FiberManualRecordIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  AddOutlined as AddOutlineIcon,
  RemoveOutlined as RemoveOutlineIcon,
  Favorite as Heart,
  Add as AddIcon,
  EditOutlined as EditIcon,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
} from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { useReactMediaRecorder } from "react-media-recorder";
import { getMetadata as getVideoMetadata, getThumbnails } from "video-metadata-thumbnails";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { matchPath } from "react-router";
import { useHistory } from "react-router-dom";
import { arrayMoveImmutable } from "array-move";
import { withStyles } from "@material-ui/core/styles";
import ColorPicker from "material-ui-color-picker";
import Webcam from "react-webcam";
import { VIDEO_PREVIEW_FLAG } from "../../../types/videoStudio.types";

import SaveVideoModal from "./SaveVideoModal";
import SettingsModal from "../components/SettingsModal";
import PromptEnableCameraModal from "./PromptEnableCameraModal";
import ScriptEditorModal from "../components/PromtScriptEditorModal";
import PromptEnableMicrophoneModal from "./PromptEnableMicrophoneModal";
import { ReactComponent as VideoModalGraphic } from "../../../assets/svg/media-disabled.svg";
import { ReactComponent as ExportIcon } from "../../../assets/svg/export.svg";
import { ReactComponent as CamVideoIcon } from "../../../assets/svg/cam-video.svg";
import { ReactComponent as PersonIcon } from "../../../assets/svg/person.svg";
import { ReactComponent as DownloadIcon } from "../../../assets/svg/download.svg";
import { Button, FlashMessage, Modal, ListItem } from "../../../components/common";
import { uuid, downloadFile } from "../../../utils/helper";
import { createVideoRequest } from "../../../reducers/candidate/videoStudio.reducer";
import appRoutes from "../../../routes/app.routes";
import {
  bytesMb,
  VideoMimeTypes,
  VIDEO_STUDIO_FILE_ADD_LIMIT,
  VIDEO_THUMB_BAR_WIDTH,
  ALLOW_VIDEO_MIN_HEIGHT,
  ALLOW_VIDEO_MIN_WIDTH,
  MIN_VIDEO_DURATION_SEC,
  FINAL_VIDEO_DURATION_LIMIT,
} from "../../../utils/appConstants";
import VideoTrimModal from "./VideoTrimModal";
import VideoPreviewModal from "./VideoPreviewModal";
import VideoEditLoadingModal from "./VideoEditLoadingModal";
import videoStudioServices from "../../../services/videoStudio.services";
import { rootReducersState } from "../../../reducers";
import Tooltip from "@material-ui/core/Tooltip";
import ThumbnailMenu from "./ThumbnailMenu";
import ThumbnailItem from "./ThumbnailItem";

interface ICheckPermission {
  showModal?: boolean;
}

enum VIDEO_STATE {
  RECORDING_STOPPED = "recording_stopped",
  RECORDING_PAUSED = "recording_paused",
  PLAYING_STOPPED = "playing_stopped",
  RECORDING = "recording",
  PLAYING = "playing",
  IDLE = "idle",
}

enum TEXT_ALIGN {
  TEXT_CENTER = "center",
  TEXT_LEFT = "left",
  TEXT_RIGHT = "right",
}

const defaultText = "";
let abortFetchFlag: VIDEO_PREVIEW_FLAG = VIDEO_PREVIEW_FLAG.IDLE; // was not able to get updated state hence took manual variable outside of the function
let videoStreaming = null;

const DarkToolTip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#31222A",
  },
  arrow: {
    color: "#31222A",
  },
}))(Tooltip);

const CandidateCreateVideo = () => {
  const AbortVideoPreviewController = new AbortController();
  const dispatch = useDispatch();
  const addFileRef = useRef(null);
  const recordedVideo = useRef(null);
  const history = useHistory();

  const {
    companyPublicProfile: { data, loading },
  } = useSelector(({ company }: rootReducersState) => company);
  const sessionReducer = useSelector(({ session }: rootReducersState) => session);
  const token = _.get(sessionReducer, "token", null);
  const profileImage = _.get(data, "profile_image", "");

  const [recordingState, setRecordingState] = useState<VIDEO_STATE>(VIDEO_STATE.IDLE);
  const [videoPreviewModalShow, setVideoPreviewModalShow] = useState<boolean>(false);
  const [videoEditLoadingModalShow, setVideoEditLoadingModalShow] = useState<boolean>(false);
  const [videoEditLoadingModalPercentage, setVideoEditLoadingModalPercentage] = useState<number>(0);
  const [videoPreviewFlag, setVideoPreviewFlag] = useState<VIDEO_PREVIEW_FLAG>(VIDEO_PREVIEW_FLAG.IDLE);
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState<any>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<any>(null);
  const [enableMicrophoneModal, setEnableMicrophoneModal] = useState(false);
  const [finalVideoDuration, setFinalVideoDuration] = useState<string>("0");
  const [videoCutModalShow, setVideoCutModalShow] = useState<boolean>(false);
  const [recordedBlobBinary, setRecordedBlobBinary] = useState<any>(null);
  const [videoExportTo, setVideoExportTo] = useState<string>("profile");
  const [studioEditDetails, setStudioEditDetails] = useState<any>({});
  const [videoCancelToken, setVideoCancelToken] = useState<any>(null);
  const [saveVideoModalShow, setSaveVideoModalShow] = useState(false);
  const [settingsModalStatus, setOpenSettingsModal] = useState(false);
  const [enableCameraModal, setEnableCameraModal] = useState(false);
  const [teleprompterText, setTeleprompterText] = useState(defaultText);
  const [teleprompterTextAlign, setTeleprompterTextAlign] = useState(TEXT_ALIGN.TEXT_CENTER);
  const [teleprompterScroll, setTeleprompterScroll] = useState(false);
  const [videoStreamStop, setVideoStreamStop] = useState<any>(null);
  const [videoPreviewBlob, setVideoPreviewBlob] = useState<Blob>();
  const [showTeleprompter, setShowTeleprompter] = useState(true);
  const [effectLogs, setEffectLogs] = useState<Array<any>>([]);
  const [studioEditMode, setStudioEditMode] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(-25);
  const [videoCutSrc, setVideoCutSrc] = useState<any>({});
  const [modalStatus, setOpenEditModal] = useState(false);
  const [fileClicked, setFileClicked] = useState(false);
  const [colorPicked, setColorPicked] = useState("");
  const [scrollSpeed, setScrollSpeed] = useState(65);
  const [image, setImage] = useState("");
  const [speed, setSpeed] = useState(6);
  const colorPickerRef = useRef<any>();

  const {
    status: videoRecodeStatus,
    startRecording,
    stopRecording,
    muteAudio,
    unMuteAudio,
    isAudioMuted,
    mediaBlobUrl,
  } = useReactMediaRecorder({
    video: true,
    audio: true,
    onStop: async (blobUrl: string, blob: Blob) => {
      if (blob.size > 0) {
        setRecordedBlobBinary(blob);
        const videoMetaData = await getVideoMetadata(blob);
        if (videoMetaData.duration >= MIN_VIDEO_DURATION_SEC) {
          const _uuid = uuid();
          let blobData: any = blob;
          blobData.name = `${_uuid}.mp4`;
          const _src = URL.createObjectURL(blob);

          const videoDuration: number = videoMetaData.duration;
          const totalThumbnails: number = Math.ceil(VIDEO_THUMB_BAR_WIDTH / 80); //  (width of div/thumb bar * 80) = l
          const thumbInterval: number = videoDuration / totalThumbnails;

          const videoFile = {
            type: "blob",
            uuid: _uuid,
            size: blob.size,
            duration: videoDuration,
            blob,
            src: _src,
          };
          setEffectLogs((prevData) => [...prevData, videoFile]);

          // Generate the thumbnails and set it
          getThumbnails(blob, {
            start: 0,
            quality: 0.7,
            interval: thumbInterval,
          }).then((thumbnails) => {
            setEffectLogs((prevData) => {
              return [...prevData].map((row) => {
                if (row.uuid === _uuid) {
                  return { ...row, thumbnails: thumbnails };
                } else {
                  return row;
                }
              });
            });
          });
        } else {
          FlashMessage(`Minimum duration must be ${MIN_VIDEO_DURATION_SEC}sec`, "error");
        }
      }
    },
  });

  // Hook, did mount
  useEffect(() => {
    // Add video play and pause add event listener
    setTimeout(() => {
      if (recordedVideo.current) {
        recordedVideo.current.addEventListener("playing", () => {
          setRecordingState(VIDEO_STATE.PLAYING);
        });
        recordedVideo.current.addEventListener("ended", () => {
          setRecordingState(VIDEO_STATE.RECORDING_STOPPED);
        });
        recordedVideo.current.addEventListener("pause", () => {
          setRecordingState(VIDEO_STATE.RECORDING_STOPPED);
        });
      }
    }, 3000);

    // Get video details if in edit mode
    fetchVideoStudioEditMode();

    checkVideoRecordPermissions();

    return () => {
      try {
        // console.log("videoStreamStop", streaming.getTracks());
        if (videoStreaming) {
          videoStreaming.getTracks().forEach((track) => {
            track.stop();
          });
        }
      } catch (error) {
        console.log({ error });
      }
    };
  }, []);

  // Fetch and set video studio
  const fetchVideoStudioEditMode = async () => {
    const matchRoute = matchPath(window.location.pathname, {
      path: appRoutes.candidateEditVideo.path,
      exact: true,
      strict: false,
    });

    const videoId = _.get(matchRoute, "params.id", 0);

    // Check if candidate is on edit page
    if (videoId) {
      try {
        // Fetch and check if video is available
        const result = await videoStudioServices.fetchVideoDetails(videoId);

        if (_.get(result, "data.data.title", "")) {
          const data = _.get(result, "data.data", {});
          setStudioEditMode(true);
          setStudioEditDetails(data);

          let blobPayload: Array<any> = [];

          (_.get(data, "videoStudioClips", []) || []).forEach((row) => {
            blobPayload.push({
              uuid: uuid(),
              videoStudioId: parseInt(videoId),
              clipId: row.id,
              fileName: row.video_file,
            });
          });

          setEffectLogs(blobPayload);
          const incPercent = 100 / blobPayload.length / 2;

          // Show Modal loading video
          setVideoEditLoadingModalShow(true);

          // Promise through all the API request and get the Blob file
          const allBlobData = await Promise.all(
            blobPayload.map(async (row) => {
              try {
                const fileResult = await videoStudioServices.getClipVideoBlob({ videoStudioId: row.videoStudioId, clipId: row.clipId });

                if (_.get(fileResult, "data", null) instanceof Blob) {
                  let blobData: any = _.get(fileResult, "data");
                  blobData.name = row.fileName;

                  const videoMetaData = await getVideoMetadata(blobData);
                  const _src = URL.createObjectURL(blobData);
                  const videoDuration: number = videoMetaData.duration;
                  const totalThumbnails: number = Math.ceil(VIDEO_THUMB_BAR_WIDTH / 80); //  (width of div/thumb bar * 80) = l
                  const thumbInterval: number = videoDuration / totalThumbnails;

                  const _uuid = row.uuid;
                  const videoFile = {
                    type: "blob",
                    uuid: _uuid,
                    size: blobData.size,
                    duration: videoDuration,
                    blob: blobData,
                    src: _src,
                    videoStudioId: row.videoStudioId,
                    clipId: row.clipId,
                  };

                  setEffectLogs((prevData) => {
                    return [...prevData].map((row) => {
                      if (row.uuid === _uuid) {
                        return videoFile;
                      } else {
                        return row;
                      }
                    });
                  });

                  // Increment percentage
                  setVideoEditLoadingModalPercentage((prevPercentage) => prevPercentage + incPercent);

                  // Generate the thumbnails and set it to uuid connector
                  getThumbnails(blobData, {
                    start: 0,
                    quality: 0.7,
                    interval: thumbInterval,
                  }).then((thumbnails) => {
                    setEffectLogs((prevData) => {
                      return [...prevData].map((row) => {
                        if (row.uuid === _uuid) {
                          return { ...row, thumbnails: thumbnails };
                        } else {
                          return row;
                        }
                      });
                    });

                    // Increment percentage
                    setVideoEditLoadingModalPercentage((prevPercentage) => prevPercentage + incPercent);
                  });

                  return true;
                } else {
                  return false;
                }
              } catch (error) {
                return false;
              }
            })
          );

          console.log({ allBlobData });
          setVideoEditLoadingModalShow(false);
        } else {
          FlashMessage("No video found", "error");
          history.push(appRoutes.candidateVideos.path);
        }
      } catch (error) {
        console.log("error", error.message);
      }
    }
  };

  // useEffect(() => {
  //   console.log("recordingState - - ", recordingState);
  // }, [recordingState]);

  const showEditModal = () => {
    setOpenEditModal(true);
    setShowTeleprompter(true);
  };

  /**
   * Check require permission before start the recording
   *
   */
  const checkVideoRecordPermissions = async (options: ICheckPermission = {}): Promise<boolean> => {
    // Check camera permissions
    try {
      const cameraPermission = await navigator.mediaDevices.getUserMedia({ video: true });

      if (cameraPermission.active === true) {
        videoStreaming = cameraPermission;
        setVideoStreamStop(cameraPermission);
        setHasCameraPermission(true);
      } else {
        if (options.showModal === true) {
          setEnableCameraModal(true);
        }

        setHasCameraPermission(false);
        return false;
      }
    } catch (error) {
      if (options.showModal === true) {
        setEnableCameraModal(true);
      }

      setHasCameraPermission(false);
      return false;
    }

    // Check auto permissions
    try {
      const microphonePermission = await navigator.mediaDevices.getUserMedia({ audio: true });

      if (microphonePermission.active === true) {
        setHasMicrophonePermission(true);
      } else {
        if (options.showModal === true) {
          setEnableMicrophoneModal(true);
        }

        setHasMicrophonePermission(false);
        return false;
      }
    } catch (error) {
      if (options.showModal === true) {
        setEnableMicrophoneModal(true);
      }

      setHasMicrophonePermission(false);
      return false;
    }

    return true;
  };

  const startPauseRecording = async () => {
    const hasPermission = await checkVideoRecordPermissions({ showModal: true });

    if (effectLogs.length < VIDEO_STUDIO_FILE_ADD_LIMIT) {
      if (hasPermission) {
        if (recordingState === VIDEO_STATE.RECORDING_STOPPED || recordingState === VIDEO_STATE.IDLE) {
          setRecordingState(VIDEO_STATE.RECORDING);
          startRecording();
          setTeleprompterScroll(true);
        } else if (recordingState === VIDEO_STATE.RECORDING) {
          setRecordingState(VIDEO_STATE.RECORDING_STOPPED);
          stopRecording();
          setTeleprompterScroll(false);
        }
      }
    } else {
      FlashMessage(`Max ${VIDEO_STUDIO_FILE_ADD_LIMIT} videos are allow`, "error");
    }
  };

  const playPauseVideo = () => {
    if (recordedVideo) {
      if (recordingState === VIDEO_STATE.PLAYING) {
        setRecordingState(VIDEO_STATE.RECORDING_STOPPED);
        recordedVideo.current.pause();
      } else {
        setRecordingState(VIDEO_STATE.PLAYING);
        recordedVideo.current.play();
      }
    }
  };

  const getAudioPermissions = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        console.log("Audio permissions: OK");
      })
      .catch((reason) => {
        FlashMessage("Permission denied, Please enabled microphone permission from browser", "error");
      });
  };

  const getCameraPermissions = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        console.log("Video permissions: OK");
        setVideoStreamStop(stream);
      })
      .catch((reason) => {
        FlashMessage("Permission denied, Please enabled camera permission from browser", "error");
      });
  };

  const increaseSpeed = () => {
    setSpeed((prevCount) => prevCount + 1);
    scrollSpeed === 5 ? setScrollSpeed(scrollSpeed) : setScrollSpeed((prevCount) => prevCount - 10);
    setScrollPosition((prevCount) => prevCount + 5);
  };

  const decreaseSpeed = () => {
    setSpeed((prevCount) => prevCount - 1);
    setScrollSpeed((prevCount) => prevCount + 10);
    setScrollPosition((prevCount) => prevCount - 5);
  };

  const setTelePromptData = (data) => {
    // const teleprompterText = (data || "").replace(/<\/?[^>]+(>|$)/g, "");
    setTeleprompterText(data);
    setOpenEditModal(false);
  };

  const smDashes = [];

  for (let i = 0; i < 20; i++) {
    smDashes.push(<div className="sm-dash"></div>);
  }

  const muteUnmuteMic = (): void => {
    if (isAudioMuted) {
      unMuteAudio();
    } else {
      muteAudio();
    }
  };

  const exportToProfile = (data: any = {}) => {
    if (effectLogs.length > 0) {
      // Get total seconds for video
      let totalSeconds = 0;
      let videoMetaData = [];

      const formData = new FormData();

      effectLogs.forEach((row) => {
        // Check first for meta data
        if (_.get(row, "metaData.endTime", 0)) {
          totalSeconds = totalSeconds + (row.metaData.endTime - row.metaData.startTime);
          videoMetaData.push({
            video: row.uuid,
            startTime: row.metaData.startTime,
            endTime: row.metaData.endTime,
          });
        } else {
          totalSeconds = totalSeconds + row.duration;
          videoMetaData.push({
            video: row.uuid,
            startTime: 0,
            endTime: row.duration,
          });
        }

        formData.append(row.uuid, row.blob, _.get(row, "blob.name", ""));
      });

      formData.append("videoMeta", JSON.stringify(videoMetaData));
      totalSeconds = parseInt(totalSeconds.toString());

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("exportTo", videoExportTo || "profile");

      if (totalSeconds <= FINAL_VIDEO_DURATION_LIMIT) {
        // Generate cancel token and send it
        const cancelToken = axios.CancelToken.source();
        setVideoCancelToken(cancelToken);

        if (studioEditMode) {
          dispatch(createVideoRequest({ formData, cancelToken, id: studioEditDetails.id }));
        } else {
          dispatch(createVideoRequest({ formData, cancelToken }));
        }
      } else {
        FlashMessage(`Final video duration must be less than ${FINAL_VIDEO_DURATION_LIMIT}`, "error");
      }
    } else {
      FlashMessage("Please record the video to export", "error");
    }
  };

  const _handleCloseSaveVideoModal = () => {
    setSaveVideoModalShow(false);

    if (videoCancelToken && typeof videoCancelToken.cancel === "function") {
      videoCancelToken.cancel();
    }
  };

  const showExportToProfileModal = (exportTo = "profile") => {
    // Return if video process is already running
    if ([VIDEO_STATE.RECORDING, VIDEO_STATE.PLAYING].includes(recordingState)) {
      return false;
    }

    if (effectLogs.length > 0) {
      let totalSeconds = 0;
      effectLogs.forEach((row) => {
        if (_.get(row, "metaData.endTime", 0)) {
          totalSeconds = totalSeconds + (row.metaData.endTime - row.metaData.startTime);
        } else {
          totalSeconds = totalSeconds + row.duration;
        }
      });

      setFinalVideoDuration(totalSeconds.toFixed(0));

      setVideoExportTo(exportTo);
      setSaveVideoModalShow(true);
    } else {
      FlashMessage("Please record the video to export", "error");
    }
  };

  const _handleOpenFileDialog = () => {
    if (effectLogs.length < VIDEO_STUDIO_FILE_ADD_LIMIT) {
      const click = _.get(addFileRef, "current.click", null);

      if (typeof click === "function") {
        addFileRef.current.click();
      }
    } else {
      FlashMessage(`Max ${VIDEO_STUDIO_FILE_ADD_LIMIT} videos are allow`, "error");
    }
  };

  const handleFileUpload = async (e) => {
    const { files } = e.target;

    if (files && files.length) {
      const file = files[0];
      const mimeType = _.get(file, "type", "");
      const fileSize = _.get(file, "size", 0);

      if (VideoMimeTypes.includes(mimeType)) {
        if (fileSize < bytesMb.mb_10 && fileSize > 0) {
          const videoMetaData = await getVideoMetadata(file);

          // Check video dimensions
          if (videoMetaData.width > ALLOW_VIDEO_MIN_WIDTH && videoMetaData.height > ALLOW_VIDEO_MIN_HEIGHT) {
            const _uuid = uuid();
            const _src = URL.createObjectURL(file);

            const videoDuration: number = videoMetaData.duration;
            const totalThumbnails: number = Math.ceil(VIDEO_THUMB_BAR_WIDTH / 80); //  (width of div/thumb bar * 80) = l
            const thumbInterval: number = videoDuration / totalThumbnails;

            const videoFile = {
              type: "blob",
              uuid: _uuid,
              size: fileSize,
              duration: videoDuration,
              blob: file,
              src: _src,
            };

            setEffectLogs((prevData) => [...prevData, videoFile]);

            // Generate the thumbnails and set it
            getThumbnails(file, {
              start: 0,
              quality: 0.7,
              interval: thumbInterval,
            }).then((thumbnails) => {
              setEffectLogs((prevData) => {
                return [...prevData].map((row) => {
                  if (row.uuid === _uuid) {
                    return { ...row, thumbnails: thumbnails };
                  } else {
                    return row;
                  }
                });
              });
            });
          } else {
            FlashMessage(`Minimum video dimensions must be ${ALLOW_VIDEO_MIN_WIDTH}x${ALLOW_VIDEO_MIN_HEIGHT}p`, "error");
          }
        } else {
          FlashMessage("File size should be less than 10mb", "error");
        }
      } else {
        FlashMessage("Upload valid mp4 or mov video file", "error");
      }
    } else {
      FlashMessage("Please select file to upload", "error");
    }
  };

  const _handleOnDeleteAddedFiles = (effect) => {
    const newData = [...effectLogs].filter((row) => row.uuid !== effect.uuid);
    setEffectLogs([...newData]);
  };

  const _handleShowVideoCutModal = (effect) => {
    setVideoCutSrc(effect);
    setVideoCutModalShow(true);
  };

  const SortableItem = SortableElement(({ effect }) => (
    <ThumbnailItem effect={effect} _handleOnDeleteAddedFiles={_handleOnDeleteAddedFiles} _handleShowVideoCutModal={_handleShowVideoCutModal} />
  ));

  const SortableList = SortableContainer(({ items }) => {
    return (
      <div className={`vs-video-sections ${items.length === 0 && "p-all-0"}`}>
        {items.map((effect, index) => (
          <SortableItem key={`item-${index}`} index={index} effect={effect} />
        ))}
      </div>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newData = arrayMoveImmutable([...effectLogs], oldIndex, newIndex);
    setEffectLogs(newData);
  };

  const _handleOnVideoCut = (effect) => {
    setEffectLogs((prevState) => {
      return [...prevState].map((row) => {
        if (row.uuid === effect.uuid) {
          return effect;
        } else {
          return row;
        }
      });
    });
  };

  let abortControllerInterval;

  const _handlePreviewDownloadVideo = (type: string) => {
    // Return if video process is already running
    if ([VIDEO_STATE.RECORDING, VIDEO_STATE.PLAYING].includes(recordingState)) {
      return false;
    }

    if (effectLogs.length > 0) {
      setVideoPreviewModalShow(true);
      setVideoPreviewFlag(VIDEO_PREVIEW_FLAG.INPROGRESS);

      // Get total seconds for video
      let totalSeconds = 0;
      let videoMetaData = [];

      const formData = new FormData();

      console.log("effectLogs", effectLogs);
      effectLogs.forEach((row) => {
        // Check first for meta data
        if (_.get(row, "metaData.endTime", 0)) {
          totalSeconds = totalSeconds + (row.metaData.endTime - row.metaData.startTime);
          videoMetaData.push({
            video: row.uuid,
            startTime: row.metaData.startTime,
            endTime: row.metaData.endTime,
          });
        } else {
          totalSeconds = totalSeconds + row.duration;
          videoMetaData.push({
            video: row.uuid,
            startTime: 0,
            endTime: row.duration,
          });
        }

        formData.append(row.uuid, row.blob, row.blob.name);
      });

      formData.append("videoMeta", JSON.stringify(videoMetaData));
      totalSeconds = parseInt(totalSeconds.toString());

      // Submit a form
      let httpHeader = new Headers();
      httpHeader.append("Authorization", `Bearer ${token}`);
      const requestOptions = {
        method: "POST",
        headers: httpHeader,
        body: formData,
        signal: AbortVideoPreviewController.signal,
      };

      fetch(`${process.env.REACT_APP_API_END_POINT}video-studio/preview-video`, requestOptions)
        .then((response) => (response.status === 200 ? response.blob() : response.json()))
        .then((result) => {
          if (result instanceof Blob) {
            if (type === "download") {
              setVideoPreviewModalShow(false);
              const fileName = `eh-studio-${uuid()}.mp4`;
              downloadFile(fileName, result);
              setVideoPreviewFlag(VIDEO_PREVIEW_FLAG.DONE_DOWNLOAD);
            } else if (type === "preview") {
              setVideoPreviewBlob(result);
              setVideoPreviewFlag(VIDEO_PREVIEW_FLAG.DONE_PREVIEW);
            }
            abortFetchFlag = VIDEO_PREVIEW_FLAG.DONE_PREVIEW;
          } else {
            setVideoPreviewModalShow(false);
            setVideoPreviewFlag(VIDEO_PREVIEW_FLAG.ERROR);
            FlashMessage("Error while generating preview", "error");
            abortFetchFlag = VIDEO_PREVIEW_FLAG.ERROR;
          }
        })
        .catch((error) => {
          if ((error.message || "").toLowerCase().indexOf("the user aborted") > -1) {
            setVideoPreviewFlag(VIDEO_PREVIEW_FLAG.ABORT);
            setVideoPreviewModalShow(false);
            console.log(error.message);
          } else {
            setVideoPreviewFlag(VIDEO_PREVIEW_FLAG.ERROR);
            FlashMessage(`${error.message || "Error while generating preview"}`, "error");
          }
          abortFetchFlag = VIDEO_PREVIEW_FLAG.ERROR;
        });
    } else {
      abortFetchFlag = VIDEO_PREVIEW_FLAG.ERROR;
      FlashMessage(`At lease 1 video required to ${type}`, "error");
    }

    abortControllerInterval = setInterval(() => {
      if ([VIDEO_PREVIEW_FLAG.MANUAL_ABORT].includes(abortFetchFlag)) {
        AbortVideoPreviewController.abort();
        abortFetchFlag = VIDEO_PREVIEW_FLAG.IDLE;
        clearInterval(abortControllerInterval);
      } else if ([VIDEO_PREVIEW_FLAG.DONE_PREVIEW, VIDEO_PREVIEW_FLAG.DONE_DOWNLOAD, VIDEO_PREVIEW_FLAG.ERROR].includes(abortFetchFlag)) {
        abortFetchFlag = VIDEO_PREVIEW_FLAG.IDLE;
        clearInterval(abortControllerInterval);
      }
    }, 500);
  };

  const _handleCloseVideoPreviewModal = (action: string) => {
    // Check current status of video preview and abort it if status is in progress
    if (VIDEO_PREVIEW_FLAG.INPROGRESS === videoPreviewFlag) {
      abortFetchFlag = VIDEO_PREVIEW_FLAG.MANUAL_ABORT;
    } else {
      // Hide the modal
      setVideoPreviewModalShow(false);

      if (action === "save") {
        if (studioEditMode) {
          showExportToProfileModal("update");
        } else {
          showExportToProfileModal("studio");
        }
      }
    }
  };

  const LeftNavItems = [
    {
      id: 1,
      title: (
        <p>
          <div className="circle">
            <Heart />
          </div>
          eH Studio {studioEditMode ? "Edit" : "New Draft"}
        </p>
      ),
    },
    {
      id: 2,
      title: (
        <p>
          <CamVideoIcon /> Video
        </p>
      ),
    },
    {
      id: 3,
      title: (
        <p>
          <ExportIcon /> Export
        </p>
      ),
      subItems: [
        {
          id: 1,
          title: (
            <p>
              <CamVideoIcon /> To Studio
            </p>
          ),
          onClick: () => {
            showExportToProfileModal("studio");
          },
        },
        {
          id: 2,
          title: (
            <p>
              <PersonIcon /> To Profile
            </p>
          ),
          onClick: () => {
            showExportToProfileModal("profile");
          },
        },
        {
          id: 3,
          title: (
            <p>
              <DownloadIcon /> Download
            </p>
          ),
          onClick: () => {
            _handlePreviewDownloadVideo("download");
          },
        },
      ],
    },
  ];

  return (
    <>
      <div className="create-video-background">
        <div className="page-wrapper">
          <div className="video-left-wrap">
            <ListItem items={LeftNavItems} />
            <div
              onClick={() => {
                history.push(appRoutes.candidateVideos.path);
              }}
              className="back-btn"
            >
              <div className="triangle-left" />
              <p>Back</p>
            </div>
          </div>
          <div className="video-center-wrap">
            <div className="create-video-wrapper">
              <div className="vs-header">
                <Button onClick={(e) => showEditModal()} startIcon={<EditIcon />} className="vs-header-edit-btn" color="secondary">
                  Edit
                </Button>
                <Button
                  onClick={() => setShowTeleprompter(!showTeleprompter)}
                  startIcon={showTeleprompter ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  className="vs-header-teleprompter-btn"
                >
                  TELEPROMPTER
                </Button>
              </div>
              <div className="vs-content">
                {hasCameraPermission === true && hasMicrophonePermission === true && showTeleprompter ? (
                  <div className="vs-container tele-script-container">
                    <div
                      className="tele-script slim-scrollbar"
                      style={{
                        animation: teleprompterScroll ? `tele-script ${scrollSpeed}s linear normal` : "none",
                        animationDelay: teleprompterScroll ? `${scrollPosition}s` : "none",
                        color: colorPicked,
                        textAlign: teleprompterTextAlign,
                      }}
                    >
                      {teleprompterText ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: teleprompterText,
                          }}
                        />
                      ) : (
                        <>
                          <p>Add Your</p>
                          <h1>Teleprompt Script</h1>
                        </>
                      )}
                    </div>
                  </div>
                ) : null}

                {!showTeleprompter && hasCameraPermission === true && hasMicrophonePermission === true && (
                  <>
                    <video
                      className={[VIDEO_STATE.RECORDING_STOPPED, VIDEO_STATE.PLAYING].includes(recordingState) ? "" : "hide"}
                      ref={recordedVideo}
                      src={mediaBlobUrl}
                      controls
                    />
                    {[VIDEO_STATE.IDLE, VIDEO_STATE.RECORDING].includes(recordingState) && (
                      <div>
                        <Webcam
                          className="video-display"
                          mirrored
                          videoConstraints={{
                            width: 1280,
                            height: 720,
                            facingMode: "user",
                          }}
                        />
                        {recordingState === VIDEO_STATE.RECORDING && (
                          <div className="video-recording-sign">
                            <FiberManualRecordIcon />
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}

                {(hasCameraPermission === false || hasMicrophonePermission === false) && (
                  <div className="vs-container disabled-camera-container">
                    <VideoModalGraphic />
                    <div className="disabled-camera-container-content">
                      <p>
                        You have not granted permission to use your camera and microphone. Use the buttons int he browser’s address bar to enable all
                        device accesses.
                      </p>
                    </div>
                    <div className="disabled-camera-container-buttons">
                      {hasCameraPermission === false && <Button onClick={(e) => getCameraPermissions()}>Enable Camera</Button>}
                      {hasMicrophonePermission === false && (
                        <Button color="secondary" onClick={(e) => getAudioPermissions()}>
                          Enable Microphone
                        </Button>
                      )}
                    </div>
                  </div>
                )}
                <div className="vs-bottom-buttons">
                  <Button
                    className="vs-button-settings btn-transparent"
                    onClick={(e) => _handlePreviewDownloadVideo("preview")}
                    disabled={[VIDEO_STATE.RECORDING, VIDEO_STATE.PLAYING].includes(recordingState)}
                  >
                    <VisibilityIcon className="settings-icon" />
                    Preview Video
                  </Button>
                  <div className="vs-cntrl-button-wrap">
                    <Button
                      className="play-button"
                      disabled={recordingState === VIDEO_STATE.RECORDING_STOPPED || recordingState === VIDEO_STATE.PLAYING ? false : true}
                      onClick={() => playPauseVideo()}
                    >
                      {recordingState === VIDEO_STATE.PLAYING ? <PauseIcon className="pause-icon" /> : <PlayArrowIcon className="play-arrow-icon" />}
                    </Button>
                    <Button
                      className="record-button"
                      onClick={() => startPauseRecording()}
                      disabled={recordingState === VIDEO_STATE.PLAYING ? true : false}
                    >
                      {recordingState === VIDEO_STATE.RECORDING && <StopIcon className="stop-icon" />}
                      {(recordingState === VIDEO_STATE.RECORDING_STOPPED ||
                        recordingState === VIDEO_STATE.IDLE ||
                        recordingState === VIDEO_STATE.PLAYING) && <FiberManualRecordIcon className="record-icon" />}
                    </Button>
                    <Button className="mic-button" onClick={() => muteUnmuteMic()} disabled={recordingState === VIDEO_STATE.RECORDING ? false : true}>
                      {isAudioMuted === true ? <MicOffIcon className="mic-icon" /> : <MicIcon className="mic-icon" />}
                    </Button>
                  </div>
                  <input className="file-upload-input" ref={addFileRef} onChange={(e) => handleFileUpload(e)} type="file" />
                  <Button
                    color="dark-pink"
                    className="vs-button-add-files btn-transparent"
                    onClick={() => _handleOpenFileDialog()}
                    disabled={[VIDEO_STATE.RECORDING, VIDEO_STATE.PLAYING].includes(recordingState)}
                  >
                    <AddIcon className="add-icon"></AddIcon>
                    Add Files
                  </Button>
                </div>
              </div>
            </div>
            <div className="vs-bottom-previewer">
              <div className="ruler">
                <div className="ruler-wrapper">
                  {[0, 1, 2, 3, 4, 5].map((row) => (
                    <div className="lg-dash" key={row}>
                      {smDashes}
                    </div>
                  ))}
                  <div className="lg-dash">
                    <div className="sm-dash"></div>
                    <div className="sm-dash"></div>
                  </div>
                </div>
              </div>
              <SortableList distance={1} axis={"x"} items={effectLogs} onSortEnd={onSortEnd} helperClass="sortable-video" />
            </div>
          </div>
          <div className="video-right-wrap">
            <div className="prompt-speed-container">
              <AddOutlineIcon className="add-circle-icon" onClick={increaseSpeed} />
              <DarkToolTip
                title={
                  <div>
                    <p className="m-0">Prompt Speed</p>
                    <p className="m-0">(Second/Line)</p>
                  </div>
                }
                placement="left"
                arrow
              >
                <p>{speed}</p>
              </DarkToolTip>
              <RemoveOutlineIcon className="remove-circle-icon" onClick={decreaseSpeed} />
            </div>
            <DarkToolTip title={<p className="m-0">Text Color</p>} placement="left" arrow>
              <div
                onClick={() => colorPickerRef && colorPickerRef.current && colorPickerRef.current.click()}
                className="color-swatch"
                style={{ backgroundColor: colorPicked }}
              />
            </DarkToolTip>
            <ColorPicker
              inputRef={colorPickerRef}
              inputProps={{ style: { display: "none" } }}
              name="color"
              className="color-picker"
              value={colorPicked}
              onChange={setColorPicked}
            />
            <div
              className={`align ${teleprompterTextAlign === TEXT_ALIGN.TEXT_LEFT && "active"}`}
              onClick={() => setTeleprompterTextAlign(TEXT_ALIGN.TEXT_LEFT)}
            >
              <FormatAlignLeft />
            </div>
            <div
              className={`align ${teleprompterTextAlign === TEXT_ALIGN.TEXT_CENTER && "active"}`}
              onClick={() => setTeleprompterTextAlign(TEXT_ALIGN.TEXT_CENTER)}
            >
              <DarkToolTip title={<p className="m-0">Text Alignment</p>} placement="left" arrow>
                <FormatAlignCenter />
              </DarkToolTip>
            </div>
            <div
              className={`align ${teleprompterTextAlign === TEXT_ALIGN.TEXT_RIGHT && "active"}`}
              onClick={() => setTeleprompterTextAlign(TEXT_ALIGN.TEXT_RIGHT)}
            >
              <FormatAlignRight />
            </div>
          </div>
        </div>
      </div>

      <SettingsModal status={settingsModalStatus} handleOnClose={() => setOpenSettingsModal(false)} />
      <PromptEnableCameraModal status={enableCameraModal} handleOnClose={() => setEnableCameraModal(false)} />
      <PromptEnableMicrophoneModal status={enableMicrophoneModal} handleOnClose={() => setEnableMicrophoneModal(false)} />
      <SaveVideoModal
        show={saveVideoModalShow}
        videoExportTo={videoExportTo}
        finalVideoDuration={finalVideoDuration}
        studioEditDetails={studioEditDetails}
        exportToProfile={(formData) => exportToProfile(formData)}
        handleOnClose={() => _handleCloseSaveVideoModal()}
      />
      <ScriptEditorModal
        value={teleprompterText}
        status={modalStatus}
        handleOnClose={() => setOpenEditModal(false)}
        onSubmit={(data) => setTelePromptData(data)}
      />
      <VideoPreviewModal
        videoPreviewFlag={videoPreviewFlag}
        videoPreviewBlob={videoPreviewBlob}
        show={videoPreviewModalShow}
        onClose={(action: string) => _handleCloseVideoPreviewModal(action)}
      />
      <VideoEditLoadingModal show={videoEditLoadingModalShow} loadingPercentage={videoEditLoadingModalPercentage} />
      <VideoTrimModal
        show={videoCutModalShow}
        onClose={() => setVideoCutModalShow(false)}
        onVideoCut={(effect) => _handleOnVideoCut(effect)}
        videoSrc={videoCutSrc}
      />
    </>
  );
};

export default CandidateCreateVideo;
