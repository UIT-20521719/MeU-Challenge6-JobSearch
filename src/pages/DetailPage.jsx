import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { KeyboardBackspace, Public, AccessTime } from '@mui/icons-material';

const DetailPage = () => {
  const location = useLocation();
  const jobDetails = location.state;

  return (
    <>
      {jobDetails ? (
        <div className="detail">
          <div className="detail__sidebar">
            <Link to="/" className="detail__sidebar__back">
              <KeyboardBackspace />
              Back to search
            </Link>
            <div className="detail__sidebar__contact">
              <p className="contact__title">HOW TO APPLY</p>
              <div>
                Please email a copy of your resume and online portfolio to{' '}
                <a href="#">wes@kasisto.com</a> & CC{' '}
                <a href="#">eric@kasisto.com</a>
              </div>
            </div>
          </div>
          <div className="detail__main">
            <div className="detail__main__header">
              <p className="title">{jobDetails.title}</p>
              <div
                className={`${
                  jobDetails.detected_extensions.schedule_type.includes(
                    'Full-time'
                  )
                    ? 'fulltime'
                    : 'hidden'
                }`}
              >
                Full time
              </div>
            </div>
            <div className="detail__main__time">
              <AccessTime />
              {jobDetails.detected_extensions.posted_at}
            </div>
            <div className="detail__main__company">
              <img
                className="img"
                src={
                  jobDetails.thumbnail
                    ? jobDetails.thumbnail
                    : require('../assets/not_found_thumbnail.png')
                }
                alt=""
              />
              <div className="company__info">
                <p className="company__info__name">{jobDetails.company_name}</p>
                <div className="company__info__location">
                  <Public />
                  {jobDetails.location}
                </div>
              </div>
            </div>
            <div className="detail__main__content">
              <div className="description">{jobDetails.description}</div>
              {jobDetails.job_highlights.map((highlight) => {
                return (
                  <div className="highlight">
                    <p className="highlight__title">{highlight.title}</p>
                    {highlight.items.map((item) => {
                      return <div className="highlight__item">{item}</div>;
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        'loading...'
      )}
    </>
  );
};

export default DetailPage;
