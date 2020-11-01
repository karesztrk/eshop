import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({
  title = 'Welcome to EShop',
  description = 'We sell the best value products',
  keywords = 'electronics, buy electronics, cheap electronics',
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
};

export default Meta;
