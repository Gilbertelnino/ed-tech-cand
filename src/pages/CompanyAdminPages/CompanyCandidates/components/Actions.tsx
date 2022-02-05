import React from "react";
import { useSelector } from "react-redux";
import { Button, Input } from '../../../../components/common';
import SearchIcon from '@material-ui/icons/Search';
import { getCurrentTab } from "../../../../utils/helper";
import { isEmpty, isUndefined } from 'lodash';

const _ = { isEmpty, isUndefined };
interface ActionProps {
  handleClick: (type: string, text?: string) => any;
}

const Actions = (props: ActionProps) => {

  const { handleClick } = props;
  const { innerTab } = useSelector(({ company }: any) => company);
  const currentSubTab = getCurrentTab(props, true);
  const activeTab = _.isEmpty(innerTab) ? _.isUndefined(currentSubTab) ? 'All' : currentSubTab : innerTab;
  const checktab = activeTab.toLowerCase();
  let searchDelay: any = null;

  const handleInstantSearch = (e) => new Promise(resolve => {
    clearTimeout(searchDelay);
    searchDelay = setTimeout(async () => {
      if (e.target) {
        resolve(handleClick('Search', e.target.value));
      }
    }, 1000);
  });

  return (
    <div className='custom-tab-wrapper candidate-tab-wrapper'>
      <div className='custom-tab-left'>
        <ul className='tab-menu'>
          <li>
            <Button className={`${checktab === 'all' ? 'active' : ''}`} onClick={() => handleClick('All')}> All </Button>
          </li>
          <li>
            <Button className={`${checktab === 'favorite' ? 'active' : ''}`} onClick={() => handleClick('Favorite')}> Favorite </Button>
          </li>
          <li>
            <Button className={`${checktab === 'qualified' ? 'active' : ''}`} onClick={() => handleClick('Qualified')}> Qualified </Button>
          </li>
          <li>
            <Button className={`${checktab === 'contacted' ? 'active' : ''}`} onClick={() => handleClick('Contacted')}> Contacted </Button>
          </li>
          <li>
            <Button className={`${checktab === 'screening' ? 'active' : ''}`} onClick={() => handleClick('Screening')}> Screening </Button>
          </li>
          <li>
            <Button className={`${checktab === 'interviewed' ? 'active' : ''}`} onClick={() => handleClick('Interviewed')}> Interviewed </Button>
          </li>
          <li>
            <Button className={`${checktab === 'hired' ? 'active' : ''}`} onClick={() => handleClick('Hired')}> Hired </Button>
          </li>
          <li>
            <Button className={`${checktab === 'rejected' ? 'active' : ''}`} onClick={() => handleClick('Rejected')}> Rejected </Button>
          </li>
        </ul>
      </div>
      <div className='custom-tab-right'>
        <Input
          name='search'
          placeholder='Search'
          className= 'custom-search-wrapper candidate-search-wrapper'
          InputProps={{
            startAdornment: <SearchIcon />
          }}
          onKeyUp={(e) => handleInstantSearch(e)}
        />
      </div>
    </div>
  );
};

export default Actions;