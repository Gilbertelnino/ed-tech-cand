import React, { ReactNode } from "react";
import { Card, Grid } from "@material-ui/core";
import ReactPlayer from "react-player";
import _ from "lodash";
import Button from "../common/Button";

interface IVideoCardDetails {
  title: string;
  description: string;
  video_file: string;
  created_at: string;
  is_primary: number;
}

interface VideoCardProps {
  details?: IVideoCardDetails;
  onDelete?: (data: any) => void;
  onEdit?: (data: any) => void;
  setAsPrimaryVideo?: (data: any) => void;
  [key: string]: any;
}

const VideoCard = ({ details, onDelete, onEdit, setAsPrimaryVideo }: VideoCardProps) => {
  return (
    <Card className="video-card">
      <div className="video-img">
        <ReactPlayer width="100%" height="100%" url={details.video_file} playing={false} controls={true} />
      </div>
      <div className="video-info-wrapper">
            <div className="video-info">
              <h2>{details.title}</h2>
              <div>
                <span>Created on :</span>
                <p>{details.created_at}</p>
              </div>
            </div>
            <div className="button-section">
              <div>
                <Button
                  className="btn-edit"
                  onClick={() => {
                    if (typeof onEdit === "function") {
                      onEdit(details);
                    }
                  }}
                >
                  Edit
                </Button>
                <Button
                  className="btn-delete"
                  onClick={() => {
                    if (typeof onDelete === "function") {
                      onDelete(details);
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
              {details.is_primary === 1 ? (
                <Button className="btn-small" disabled>
                  Profile video
                </Button>
              ) : (
                <Button
                  color="dark-pink"
                  className="btn-small"
                  onClick={() => {
                    if (typeof setAsPrimaryVideo === "function") {
                      setAsPrimaryVideo(details);
                    }
                  }}
                >
                  Set As profile
                </Button>
              )}
            </div>
      </div>
    </Card>
  );
};

export default VideoCard;
