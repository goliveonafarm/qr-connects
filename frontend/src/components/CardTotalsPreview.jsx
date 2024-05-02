import { useState, useEffect } from "react";
import { useDrawerContext } from "../context/DrawerContext";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";

const CardTotalsPreview = ({ responses, formData, formType, title }) => {
  const [responseSummary, setResponseSummary] = useState({
    total: 0,
    attending: 0,
    optionVotes: [],
  });

  const { isDrawerOpen, toggleDrawer, updateDrawerContent } =
    useDrawerContext();

  useEffect(() => {
    if (formType === "afterparty" || formType === "potluck") {
      const total = responses?.length;
      const attending = responses?.reduce(
        (acc, curr) => acc + (curr.attending ? 1 : 0),
        0
      );
      setResponseSummary({ total, attending });
    } else if (formType === "poll") {
      const votes = new Array(formData.options.length).fill(0);
      responses?.forEach((response) => {
        if (typeof response.vote === "number") {
          const voteIndex = response.vote;
          if (voteIndex >= 0 && voteIndex < votes.length) {
            votes[voteIndex]++;
          }
        }
      });
      setResponseSummary({
        total: votes.reduce((a, b) => a + b, 0),
        optionVotes: votes,
      });
    }
  }, [responses]);

  const totalVotes = responseSummary?.total || 0;

  const renderForm = () => {
    switch (formType) {
      case "afterparty":
        return (
          <div className="">
            <div>{`${responseSummary?.total || 0} Invite${
              responseSummary?.total === 1 ? `` : `s`
            } sent`}</div>
            <div className="text-lg">{`${
              responseSummary?.attending || 0
            } Attending`}</div>
          </div>
        );
      case "potluck":
        return (
          <div>
            <div>{`${responseSummary?.total || 0} Invite${
              responseSummary?.total === 1 ? `` : `s`
            } sent`}</div>
            <div className="text-lg">{`${
              responseSummary?.attending || 0
            } Attending`}</div>
          </div>
        );
      case "poll":
        return (
          <div>
            <div>
              {`${totalVotes} total submission${
                totalVotes > 1 || totalVotes === 0 ? "s" : ""
              }`}
            </div>
            <div className="border-t border-gray-300 my-1"></div>
            <div className=" overflow-y-auto ">
              {formData.options.map((option, index) => (
                <div key={index} className="flex max-w-sm">
                  <div className="pr-2">{`${
                    responseSummary.optionVotes[index] || 0
                  }`}</div>
                  <div>{option.text}</div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  //dynamically displays the correct content about the response to the drawer
  const DrawerContent = () => {
    const formatResponse = (response) => {
      switch (formType) {
        case "afterparty":
          return (
            <div>
              {response.attending === true && `Attending`}
              {response.attending === false && `Not attending`}
              {response.attending === null && `Invite Pending`}
            </div>
          );
        case "potluck":
          return (
            <div>
              {response.attending === true &&
                !response.dish &&
                `Attending (no dish)`}
              {response.attending === false && `Not attending`}
              {response.attending === null && `Invite Pending`}
              {response.attending === true &&
                response.dish &&
                `${capitalizeFirstLetter(response.dish)}`}
            </div>
          );
        case "poll":
          return <div>{formData.options[response.vote]?.text}</div>;
      }
    };

    return (
      <div
        className="text-slate-300"
        style={{ textShadow: "1px 1px 2px black" }}
      >
        <div className="text-2xl font-bold">{title}</div>
        <div className="border-t border-gray-300 my-1"></div>
        <div className="pb-5">{renderForm()}</div>
        <div className="text-2xl font-bold">Results</div>
        {responses.map((response, index) => {
          if (response.vote === null)
            return (
              <div>
                <div className="border-t border-gray-300 my-1"></div>
                <div>
                  No results yet. Someone will need to submit this QR-Connect
                  first
                </div>
              </div>
            );
          return (
            <div key={index} className=" text-lg">
              <div className="border-t border-gray-300 my-1"></div>
              <div>{response.name || "Anonymous"} -</div>
              {formatResponse(response)}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="border-y-2">
      <div className="">{renderForm()}</div>
      <button
        className="text-blue-500 underline hover:text-blue-700 cursor-pointer pb-1"
        style={{ textShadow: "1px 1px 2px black" }}
        onClick={() => {
          updateDrawerContent(DrawerContent());
          toggleDrawer();
        }}
      >
        See full results
      </button>
    </div>
  );
};

export default CardTotalsPreview;
