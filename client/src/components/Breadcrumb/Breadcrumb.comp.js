import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Breadcrumbcomp = ({ page }) => {
  return (
    <Breadcrumb className='breadcrumb'>
      <Breadcrumb.Item to="/dashboard"><Link to="/dashboard">Home</Link></Breadcrumb.Item>
      <Breadcrumb.Item active>{page}</Breadcrumb.Item>
    </Breadcrumb>
  );
};
