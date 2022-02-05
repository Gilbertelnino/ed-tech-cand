import React from "react";
import { useSelector } from "react-redux";
import { Button } from '../../../../components/common';
import { getCurrentTab } from "../../../../utils/helper";
import { isEmpty, isUndefined, get } from 'lodash';
import ViewIcon from '@material-ui/icons/Visibility';

const _ = { isEmpty, isUndefined, get };
interface ActionProps {
  handleClick: (type: string, text?: string) => any;
}

const Actions = (props: ActionProps) => {

  const { handleClick } = props;
  const { innerTab } = useSelector(({ company }: any) => company);
  const navBarReducer = useSelector(({ common }: any) => common);
  const currentSubTab = getCurrentTab(props, true);
  const saveButtonLoader = _.get(navBarReducer, "navBar.saveButtonLoading", false);
  const activeTab = _.isEmpty(innerTab) ? _.isUndefined(currentSubTab) ? 'People' : currentSubTab : innerTab;
  const checktab = activeTab.toLowerCase();
  return (
    <div className='custom-tab-wrapper'>
      <div className='custom-tab-left'>
        <ul className='tab-menu'>
          <li>
            <Button className={`${checktab === 'all' ? 'active' : ''}`} onClick={() => handleClick('All')}> Home </Button>
          </li>
          <li>
            <Button className={`${checktab === 'people' ? 'active' : ''}`} onClick={() => handleClick('People')}> People </Button>
          </li>
          <li>
            <Button className={`${checktab === 'jobs' ? 'active' : ''}`} onClick={() => handleClick('Jobs')}> Jobs </Button>
          </li>
          <li>
            <Button className={`${checktab === 'news' ? 'active' : ''}`} onClick={() => handleClick('News')}> News </Button>
          </li>
          <li>
            <Button className={`${checktab === 'events' ? 'active' : ''}`} onClick={() => handleClick('Events')}> Events </Button>
          </li>
        </ul>
      </div>
      <div className='custom-tab-right'>
        <Button startIcon={<ViewIcon />} onClick={() => handleClick('Preview')} className={'preview-btn primary-btn'}>Preview</Button>
        <Button loading={saveButtonLoader} disabled={saveButtonLoader} onClick={() => handleClick('Save')} color="secondary" className="save-button">Save</Button>
        <Button disabled={saveButtonLoader} onClick={() => handleClick('Publish')} className="publish-button">Publish</Button>
      </div>
    </div>
  );
};

export default Actions;