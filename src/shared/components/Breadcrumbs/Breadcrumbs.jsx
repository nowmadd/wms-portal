import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './breadcrumbs.scss';

const Breadcrumbs = ({ page }) => {
  const navigate = useNavigate();
  const curPath = window.location.pathname.split('/');

  return (
    <div className="breadcrumbs">
      <a className="breadcrumbs__pathcrumbs" onClick={() => navigate(-1)}>
        {curPath[1]}
      </a>
      <i className="breadcrumbs__chevron bx bx-chevron-right"></i>
      <div className="breadcrumbs__currentcrumb">{page} </div>
    </div>
  );
};

Breadcrumbs.propTypes = {
  page: PropTypes.string.isRequired,
};

export default Breadcrumbs;
