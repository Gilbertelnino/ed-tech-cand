import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchQuoteOfTheDayRequest } from "../../reducers/common/quoteOfTheDay.reducer";
import _ from "lodash";
import { QUOTES } from "../../utils/quotes";
import moment from "moment";
import Skeleton from "@material-ui/lab/Skeleton";

const QuoteOfTheDay = () => {

  const dispatch = useDispatch();
  const commonStore = useSelector(({ common }) => common);
  const quoteOfTheDay = _.get(commonStore, "quoteOfTheDay.data", {});
  const loading = _.get(commonStore, "quoteOfTheDay.loading", false);
  const fallBackQuote = QUOTES;

  useEffect(() => {

    const today = moment().format("YYYY-MM-DD");

    // Fetch quote only if not called
    if (!quoteOfTheDay.quote && quoteOfTheDay.date !== today) {
      dispatch(fetchQuoteOfTheDayRequest({}));
    }
  }, []);

  return (
    <div className="quote-container">
      <div className="circle">
        <span className="text-center">
          {(loading) ? (
            <>
              {[1, 2, 3, 4, 5, 6].map((key) => <Skeleton variant="text" key={key} />)}
              <Skeleton variant="text" width={250} height={40} />
            </>
          ) : (
            <>
              {(quoteOfTheDay.quote || fallBackQuote.quote)}
              <br /><br />
              - {(quoteOfTheDay.author || fallBackQuote.author)}
            </>
          )}
        </span>
      </div>
    </div>
  )

}

export default QuoteOfTheDay;
