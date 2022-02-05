import React from "react";
import { useSelector } from "react-redux";
import { Button, Input } from '../../../components/common';
import SearchIcon from '@material-ui/icons/Search';
import { getCurrentTab } from "../../../utils/helper";
import { isEmpty, isUndefined } from 'lodash';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const _ = { isEmpty, isUndefined };
interface ActionProps {
  handleClick: (type: string, text?: string) => any;
  handleAdminDetailModal: (id: number) => any;
  handleAdminHistoryModal: (id: number) => any;
  showHistory: boolean;
  showDetail: boolean;
}

const Actions = (props: ActionProps) => {

  const { handleClick, handleAdminDetailModal, handleAdminHistoryModal, showHistory, showDetail } = props;
  const { innerTab } = useSelector(({ company }: any) => company);
  const currentSubTab = getCurrentTab(props, true);
  const activeTab = _.isEmpty(innerTab) ? _.isUndefined(currentSubTab) ? 'All' : currentSubTab : innerTab;
  const checktab = activeTab.toLowerCase();
  let searchDelay: any = null;

  const handleInstantSearch = (e) => new Promise(resolve => {
    clearTimeout(searchDelay);
    searchDelay = setTimeout(async () => {
      if (e.target.value) {
        resolve(handleClick('Search', e.target.value));
      }
    }, 1000);
  });

  return (
    <div className='custom-tab-wrapper'>
      <div className='custom-tab-left'>
        {
          showHistory ? <ul className='tab-menu'>
            <li className="action-back-button">
              <ArrowBackIcon onClick={() => handleAdminHistoryModal(0)} />
            </li>
            <li>
              <Button className={'action-history-button active'} > Admin History </Button>
            </li>
          </ul> : showDetail ? <ul className='tab-menu'>
            <li className="action-back-button">
              <ArrowBackIcon onClick={() => handleAdminDetailModal(0)} />
            </li>
            <li>
              <Button className={'action-history-button active'} > Admin Profile </Button>
            </li>
          </ul> :
          <ul className='tab-menu'>
            <li>
              <Button className={`${checktab === 'all' ? 'active' : ''}`} onClick={() => handleClick('All')}> All </Button>
            </li>
            {/*
              <li>
                <Button className={`${checktab === 'archive' ? 'active' : ''}`} onClick={() => handleClick('InHouse')}> In-House </Button>
              </li>
              <li>
                <Button className={`${checktab === 'drafts' ? 'active' : ''}`} onClick={() => handleClick('Agencies')}> Agencies </Button>
              </li>
            */}
          </ul>
        }
        
      </div>
      { 
          !showHistory && !showDetail &&
          <div className='custom-tab-right'>
            <Input
              name='search'
              placeholder='Search'
              className='custom-search-wrapper'
              InputProps={{
                startAdornment: <SearchIcon />
              }}
              onKeyUp={(e) => handleInstantSearch(e)}
            />
            <Button onClick={() => handleClick('Add')}>New</Button>
          </div>   
      }
    </div>
  );
};

export default Actions;