import React, { memo } from "react";
import Menu from "./Menu";
import Skeleton from "@material-ui/lab/Skeleton";
// import { ReactComponent as CopyIcon } from "../../../assets/svg/copy.svg";
import { ReactComponent as TrashIcon } from "../../../assets/svg/trash.svg";
import { ReactComponent as ScissorsIcon } from "../../../assets/svg/scissors.svg";
import { ContextMenuTrigger } from "react-contextmenu";

interface IThumbnailItem {
  effect: any;
  _handleShowVideoCutModal?: (effect: any) => void;
  _handleOnDeleteAddedFiles?: (effect: any) => void;
}
const ThumbnailItem = ({ effect, _handleOnDeleteAddedFiles, _handleShowVideoCutModal }: IThumbnailItem) => {
  const thumbnailMenuItems = [
    // { id: 1, title: "Copy", icon: <CopyIcon /> },
    { id: 2, title: "Trim", icon: <ScissorsIcon />, onClick: () => _handleShowVideoCutModal(effect) },
    { id: 3, title: "Delete", icon: <TrashIcon />, onClick: () => _handleOnDeleteAddedFiles(effect) },
  ];

  return (
    <ContextMenuTrigger id="thumbnail_item_container">
      <div className="video-effect-wrap">
        {effect.thumbnails ? (
          <>
            <video key={effect.uuid} className="previews-img" src={effect.src} />
            <Menu id="thumbnail_item_container" items={thumbnailMenuItems} />
          </>
        ) : (
          <Skeleton variant="rect" animation="wave" className="previews-img" />
        )}
      </div>
    </ContextMenuTrigger>
  );
};

export default memo(ThumbnailItem);
