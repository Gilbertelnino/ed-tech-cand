import React, { useRef } from "react";
import { useState, FunctionComponent, useEffect } from "react";
import { Grid } from "@material-ui/core";
import unknownProfile from "../../assets/images/avatar.png";
import Spinner from "../../components/common/Spinner";
// import { Input } from "../../components/common";
import { isNull, get } from "lodash";
// import Avatar from "@material-ui/core/Avatar";
import UserAvatar from "../../components/common/UserAvatar";
const _ = { isNull, get };

const PhotoUploadForm: FunctionComponent<any> = (props) => {
  const { picturePath, profileImageUrl } = props;
  const ref: any = useRef();
  const [imageUrl, setImageUrl] = useState(null);

  // set candidate profile image url hook
  useEffect(() => {
    if (picturePath) {
      setImageUrl(picturePath);
    }
  }, [picturePath]);

  const _handleUploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    props.uploadPhoto(file, "image");
  };

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Spinner visible={props.isUploading} loadingTip="">
          <UserAvatar
            onClick={() => ref?.current?.click()}
            size="md"
            src={!_.isNull(imageUrl) ? imageUrl : profileImageUrl ? profileImageUrl : unknownProfile}
            variant="circle"
          />
        </Spinner>
        <input onChange={_handleUploadPhoto} type="file" ref={ref} hidden />
      </Grid>
    </Grid>
  );
};

export default PhotoUploadForm;
