export const postData = (data) => {
  return fetch("http://localhost:3001/consents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const fetchData = () => {
  return fetch("http://localhost:3001/consents");
};
