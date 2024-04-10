import React, { useEffect, useState } from 'react';
import { Public, WorkOutline } from '@mui/icons-material';
import JobCard from '../components/JobCard';
import { Link } from 'react-router-dom';
import { Pagination, Stack } from '@mui/material';
import data from '../data';

const MainPage = () => {
  // const API_ENDPOINT = 'http://localhost:3001/';
  const itemsPerPage = 5;

  const [searchbarQuery, setSearchbarQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [isFulltime, setIsFulltime] = useState(false);

  const [jobsData, setJobsData] = useState([]);
  const [searchJobsResult, setSearchJobsResult] = useState(jobsData);

  const [startOffset, setStartOffset] = useState(0);
  const [displayJobs, setDisplayJobs] = useState([]);

  const fetchJobsData = async () => {
    // const api = `${API_ENDPOINT}?query=${searchbarQuery} ${
    //   isFulltime ? 'full-time' : ''
    // } ${searchLocation}`;
    // try {
    //   const res = await fetch(api);
    //   const data = await res.json();
    //   const length = data.jobs_results.length;

    //   if (res.ok) {
    //     const endData = [...jobsData];
    //     for (let i = 0; i < length; i++) {
    //       endData[startOffset + i] = data.jobs_results[i];;
    //     }
    //     setJobsData(endData);
    //   }
    // } catch (e) {
    //   console.log(e);
    // }

    /**mock data */
    setJobsData(data);
  };

  useEffect(() => {
    if (!jobsData[startOffset]) {
      fetchJobsData();
    } else {
      handleSearch();
      setDisplayJobs(
        searchJobsResult.slice(startOffset, startOffset + itemsPerPage)
      );
    }
  }, [startOffset, searchbarQuery, searchLocation, isFulltime]);

  // render on re-fetch
  useEffect(() => {
    handleSearch();
  }, [jobsData]);

  useEffect(() => {
    setDisplayJobs(
      searchJobsResult.slice(startOffset, startOffset + itemsPerPage)
    );
  }, [searchJobsResult]);

  const handleSearch = () => {
    const searchJobsData = jobsData.filter((job) => {
      const searchStr =
        job.description.toString().toLowerCase() +
        job.title.toString().toLowerCase() +
        job.location.toString().toLowerCase() +
        job.title.toString().toLowerCase() +
        job.detected_extensions.schedule_type.toString().toLowerCase();

      const q = searchbarQuery.toLowerCase();
      const lct = searchLocation.toLowerCase();
      if (searchStr.includes(q) && searchStr.includes(lct)) {
        if (isFulltime) {
          if (searchStr.includes('full-time')) return job;
        } else {
          return job;
        }
      }
    });
    setSearchJobsResult(searchJobsData);
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
          <button type="button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div className="container">
        <div className="container__left">
          <div className="container__left__checkbox">
            <input
              type="checkbox"
              value={isFulltime}
              onChange={() => {
                setIsFulltime(!isFulltime);
              }}
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
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
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
          {displayJobs.length > 0 ? (
            displayJobs.map((job) => {
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
            })
          ) : (
            <>
              <div className="container__right__empty">No result</div>
            </>
          )}
          {searchJobsResult.length > itemsPerPage && (
            <Stack spacing={2} alignItems="flex-end">
              <Pagination
                count={Math.ceil(searchJobsResult.length / 5)}
                size="medium"
                variant="outlined"
                shape="rounded"
                onChange={(e, pageNumber) => {
                  setStartOffset((pageNumber - 1) * itemsPerPage);
                }}
                color="primary"
              />
            </Stack>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
