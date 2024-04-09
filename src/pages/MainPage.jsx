import React, { useEffect, useState } from 'react';
import {
  Public,
  WorkOutline,
  ArrowForwardIos,
  ArrowBackIos,
} from '@mui/icons-material';
import JobCard from '../components/JobCard';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const MainPage = () => {
  // const API_ENDPOINT = 'http://localhost:3001/';
  const itemsPerPage = 5;

  const [searchbarQuery, setSearchbarQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [isFulltime, setIsFulltime] = useState(false);
  const [jobsData, setJobsData] = useState([]);
  const [offset, setOffset] = useState(10);
  const [start, setStart] = useState(0);

  // const fetchJobsData = async () => {
  //   try {
  //     const api = `${API_ENDPOINT}?query=${searchbarQuery} ${
  //       isFulltime ? 'full-time' : ''
  //     } ${searchLocation}`;

  //     const res = await fetch(api);

  //     const data = await res.json();
  //     if (res.ok) {
  //       setJobsData(
  //         data.jobs_results.slice(offset % 10, (offset % 10) + itemsPerPage)
  //       );
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // fetch jobs whether offset or search query changed
  useEffect(() => {
    setJobsData([
      {
        title: 'Barista',
        company_name: 'Legacy Records',
        location: 'New York, NY',
        via: 'via Glassdoor',
        description:
          'We are seeking a Barista for our coffee counter and cafe Easy Victor...',
        job_highlights: [
          {
            title: 'Qualifications',
            items: [
              'Candidates must be organized, hard-working, self-motivated and skilled communicators with coffee and customer service experience',
            ],
          },
        ],
        related_links: [
          {
            link: 'https://www.google.com/search?q=Legacy+Records&sa=X&ved=0ahUKEwimkYSu4ZP8AhXhknIEHX_jB_cQmJACCIoK',
            text: 'See web results for Legacy Records',
          },
        ],
        thumbnail:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxTQTdiyx6mStWDg8POBVdtEglmrWPyZqlcsKCW-k&s',
        extensions: ['3 days ago', 'Part-time', 'No degree mentioned'],
        detected_extensions: {
          posted_at: '3 days ago',
          schedule_type: 'Full-time',
        },
        job_id:
          'eyJqb2JfdGl0bGUiOiJCYXJpc3RhIiwiaHRpZG9jaWQiOiJ1ek5lRDJTU1JkZ0FBQUFBQUFBQUFBPT0iLCJmYyI6IkV1SUJDcUlCUVVGMFZteGlSR2g0TW5kNVprd3pVRE5PUWtWVExYY3dTa2hMZUdWcE1rRmhkazV6VTBOaE1tOVZZemRrZEhGa1RrSk9TRkZWVVdGeVRWZENUbU41VEVoNFNtbHBkM2hDTFdwQ2JWRnNOa2xqVTJoTWNVUlJkRU5hTWtsWGRHODFWV2xPYUVzM00yVjBNR1V0Y3pGYVNtSTBNSFZJVXkxbWEwWkNXWEZvUmtkUmFraEtURk5OWlVWNVVYUjVkWFl3Um1ocU1USlNhMFJuY1dKR2FXRkpVMDVSRWhkb1RIRnVXVFpoWDBGbFIyeDVkRTFRWHpoaFpuVkJPQm9pUVVSVmVVVkhaRTlyTkhWa1prRmZhakpYZWpkb1QwSlNTSHB6UVRSNVpHdG1RUSIsImZjdiI6IjMiLCJmY19pZCI6ImZjXzIiLCJhcHBseV9saW5rIjp7InRpdGxlIjoiQXBwbHkgb24gR2xhc3Nkb29yIiwibGluayI6Imh0dHBzOi8vd3d3LmdsYXNzZG9vci5jb20vam9iLWxpc3RpbmcvYmFyaXN0YS1sZWdhY3ktcmVjb3Jkcy1KVl9JQzExMzIzNDhfS08wLDdfS0U4LDIyLmh0bT9qbD0xMDA4MzY3NDA2MTc1XHUwMDI2dXRtX2NhbXBhaWduPWdvb2dsZV9qb2JzX2FwcGx5XHUwMDI2dXRtX3NvdXJjZT1nb29nbGVfam9ic19hcHBseVx1MDAyNnV0bV9tZWRpdW09b3JnYW5pYyJ9fQ==',
      },
    ]);
    // fetchJobsData();
  }, [offset, searchbarQuery, searchLocation, isFulltime]);

  // change fetch page whether offset changed
  useEffect(() => {
    if (offset % 10 === 0) {
      setStart(offset);
    } else if (offset % 10 !== 0 && offset !== start) {
      setStart(offset - (offset % 10) + 10);
    }
  }, [offset]);

  // pagination
  const handlePageClick = (e) => {
    setOffset(e.selected * itemsPerPage);
  };

  return (
    <div className="main">
      <div className="searchbar">
        <div className="searchbar__input">
          <WorkOutline className="icon" />
          <input
            type="text"
            placeholder="Title, companies, expertise or benefits"
            value={searchbarQuery}
            onChange={(e) => {
              setSearchbarQuery(e.target.value);
            }}
          />
          <button type="button">Search</button>
        </div>
      </div>
      <div className="container">
        <div className="container__left">
          <div className="container__left__checkbox">
            <input
              type="checkbox"
              value={isFulltime}
              onChange={() => setIsFulltime(!isFulltime)}
            />
            <label>Full time</label>
          </div>
          <div className="container__left__title">Location</div>
          <div className="container__left__input">
            <Public />
            <input
              type="text"
              placeholder="City, state, zip code or country"
              value={searchLocation}
              onChange={(e) => {
                setSearchLocation(e.target.value);
              }}
            />
          </div>
          <div className="container__left__option">
            <div className="radio">
              <input
                type="radio"
                name="location_radio"
                value="London"
                checked={searchLocation === 'London'}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSearchLocation('London');
                  }
                }}
              />
              <label>London</label>
            </div>
            <div className="radio">
              <input
                type="radio"
                name="location_radio"
                value="Amsterdam"
                checked={searchLocation === 'Amsterdam'}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSearchLocation('Amsterdam');
                  }
                }}
              />
              <label>Amsterdam</label>
            </div>
            <div className="radio">
              <input
                type="radio"
                name="location_radio"
                value="New York"
                checked={searchLocation === 'New York'}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSearchLocation('New York');
                  }
                }}
              />
              <label>New York</label>
            </div>
            <div className="radio">
              <input
                type="radio"
                name="location_radio"
                value="Berlin"
                checked={searchLocation === 'Berlin'}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSearchLocation('Berlin');
                  }
                }}
              />
              <label>Berlin</label>
            </div>
          </div>
        </div>
        <div className="container__right">
          {jobsData &&
            jobsData.map((job) => {
              return (
                <div key={job.job_id}>
                  <Link
                    to={`/detail`}
                    state={job}
                    className="container__right__job"
                  >
                    <JobCard content={job} />
                  </Link>
                </div>
              );
            })}
          <ReactPaginate
            breakLabel="..."
            nextLabel={<ArrowForwardIos />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={20}
            previousLabel={<ArrowBackIos />}
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            disabledClassName="disabled-page"
            nextClassName="item next"
            pageClassName="item pagination-page"
            previousClassName="item previous"
            activeClassName="item active"
            breakClassName="item break"
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
