import React from 'react';
import ProfileView from '../../../components/ProfileView/ProfileView';
export default function CandidateProfileView() {

  return (
    <div id="profileView">
       <ProfileView showEditButton = {true} showShareButton = {true} showDeleteButton={true} /> 
    </div>
  );
}
