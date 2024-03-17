"use client";
import React from 'react';
import ReactLoading from 'react-loading';
 
const Loading = ({ type, color }) => (
    <ReactLoading type={type} color={color} height={75} width={75} />
);
 
export default Loading;