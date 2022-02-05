import React, { ReactNode, useState, useRef } from 'react';
import Button from '../../../components/common/Button';
import SaveIcon from '@material-ui/icons/Save';
import PublishIcon from '@material-ui/icons/Publish';
import ViewIcon from '@material-ui/icons/Visibility';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Input } from '../../../components/common';
import { useForm } from "react-hook-form";
import { map, get, isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { rootReducersState } from '../../../reducers';
const _ = { map, get, isEmpty };

interface ActionButtonProps {
  data: object;
  handleClick: (e: any, type: string) => any;
  tab: string;
}

type Search = {
  search: string;
};

interface iconProp {
  [key: string]: ReactNode
}

const icons: iconProp = {
  Add: <AddIcon />,
  File: <InsertDriveFileIcon />,
  Publish: <PublishIcon />,
  Save: <SaveIcon />,
  Edit: <EditIcon />,
}

const ActionButtons = (props: ActionButtonProps) => {
  const navBarReducer = useSelector(({ common }: any) => common);
  const sessionReducer = useSelector(({ session }: rootReducersState) => session);
  const saveButtonLoader = _.get(navBarReducer, "navBar.saveButtonLoading", false);
  const [showSearchBox, setOpen] = useState(false);
  const [buttonType, setType] = useState('');
  const { handleSubmit, register } = useForm<Search>();
  const refSearch = useRef<HTMLButtonElement>(null);
  const userData = _.get(sessionReducer, "currentUser", {});
  const tab = _.get(props, "tab", '');
  const isParentAdmin = _.get(userData, "parent_id", 0) === null;
  let searchDelay: any = null;

  const handleClick = (e: any, type: string) => {
    setType(type);
    return props.handleClick(e, type);
  }

  const handleSearchClick = (e: any, type: string) => {
    if (type === 'search') {
      setOpen(true);
    }
  }

  const handleInstantSearch = () => new Promise(resolve => {
    clearTimeout(searchDelay);
    searchDelay = setTimeout(async () => {
      if (refSearch.current) {
        resolve(refSearch.current.click());
      }
    }, 1000);
  });

  const onSubmit = (data: object, e: any) => {
    const text = _.get(data, "search", "");
    handleClick(text, 'search');
  }

  const getIcon = (icon: string) => {
    if (!_.isEmpty(icon)) {
      return icons[icon];
    }
  }

  const getPreviewButton = () => {
    return <Button className={'preview-btn primary-btn'} startIcon={<ViewIcon />} onClick={(e: any) => handleClick(e, 'Preview')}>Preview</Button>;
  }

  const getSearchButton = (button: object) => {
    const type = _.get(button, "title", "");
    return (
      showSearchBox ?
        <form className="search-form-wrapper" noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="search-form">
            <Input
              name="search"
              inputRef={register}
              className="search-box"
              placeholder='Start typing...'
              onKeyUp={() => handleInstantSearch()}
              InputProps={{ endAdornment: <IconButton ref={refSearch} type="submit" className="btn-search" > <SearchIcon /> </IconButton> }}
            />
            <IconButton aria-label="search" onClick={() => {
              setOpen(false);
              handleClick("", 'search'); // reset search
            }}>
              <CloseIcon />
            </IconButton>
          </div>
        </form>
        :
        <IconButton aria-label="search" className="search-btn" onClick={(e: any) => handleSearchClick(e, type)}>
          <SearchIcon />
        </IconButton>
    );
  }

  const getAddViewButton = (button: object) => {
    const type = _.get(button, "type", "");
    const icon = _.get(button, "icon", "");
    const title = _.get(button, "title", "");
    const className = type === "contained" ? 'add-btn' : 'view-btn';
    return !_.isEmpty(title) && <Button variant={type} loading={saveButtonLoader && buttonType === icon} className={className} startIcon={getIcon(icon)} onClick={(e: any) => handleClick(e, icon)}> {title} </Button>;
  }

  const getButtons = (data: any) => {
    const { action } = data;
    const buttons = _.map(action, button => {
      const title = _.get(button, "title", "");
      if (!isParentAdmin && title !== "Preview" && tab === 'page') {
        return null;
      }
      if (title === "Preview") {
        return getPreviewButton();
      } else if (title === "search") {
        return getSearchButton(button);
      } else {
        return getAddViewButton(button);
      }
    });
    return buttons;
  }

  const { data } = props;
  return (
    <div className="tab-action-button-wrapper">
      {getButtons(data)}
    </div>
  );
}
export default ActionButtons;
