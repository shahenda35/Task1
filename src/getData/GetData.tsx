import React, { useEffect, useState } from "react";
import { ApplicationForm } from "../dataClass/ApplicationForm.tsx";

const apiUrl =
  "http://127.0.0.1:4010/api/887.7935644644983/programs/enim/application-form";

const MyComponent: React.FC = () => {
  //ApplicationForm data = new ApplicationForm(); bel setters wel getters
  const [data, setData] = useState<ApplicationForm | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`Network response was not ok (${response.status})`);
        } else {
          const jsonObject = await response.json();
          const appForm = new ApplicationForm(jsonObject["data"]);
          setData(appForm);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Fetched Data</h1>
      {data ? (
        <ul>
          {data?.data?.attributes?.customisedQuestions?.map(
            (item: any, index: number) => (
              <ul key={index}>
                <li>ID: {item.id}</li>
                <li>Disqualify: {item.disqualify}</li>
                <li>Max Choice: {item.maxChoice}</li>
                <li>Other: {item.other}</li>
                <li>Question: {item.question}</li>
                <li>Type: {item.type}</li>
              </ul>
            )
          )}
        </ul>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default MyComponent;
