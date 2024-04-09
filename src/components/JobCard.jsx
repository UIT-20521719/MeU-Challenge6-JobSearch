import React from 'react';
import { Public, AccessTime } from '@mui/icons-material';

const JobCard = ({ content }) => {
  return (
    <>
      {content && (
        <div className="card">
          <img
            src={
              content.thumbnail
                ? content.thumbnail
                : require('../assets/not_found_thumbnail.png')
            }
            alt=""
            className="card__img"
          />
          <div className="card__content">
            <p className="card__content__company">{content.company_name}</p>
            <p className="card__content__title">{content.title}</p>
            <div className="card__content__moreinfo">
              <div
                className={`${
                  content.detected_extensions.schedule_type.includes(
                    'Full-time'
                  )
                    ? 'fulltime'
                    : 'hidden'
                }`}
              >
                Fulltime
              </div>
              <div className="moreinfo__end">
                <Public className="icon" />
                <div className="location">{content.location}</div>
                <AccessTime className="icon" />
                <div className="time">
                  {content.detected_extensions.posted_at}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobCard;
