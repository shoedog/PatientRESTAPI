exports.errorHandler = (res, err) => {
  console.log(`Error: ${err}`);
  return res.json({
    type: false,
    data: `Error occurred: ${err}`,
  });
};

exports.resHandler = (res, type, data, token) => {
  if (token){
    return res.json({
      type: type,
      data: data,
      token: token,
    });
  } else {
    return res.json({
      type: type,
      data: data,
    });
  }
};