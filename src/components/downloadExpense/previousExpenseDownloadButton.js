import { RiDownloadCloud2Fill } from "react-icons/ri";

const PreviousExpenseDownloadButton = (props) => {
  const expenseDownloader = () => {
  console.log(props.link)
    const fileUrl = props.link;
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = "fundsTracker-Expense-Report";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  };
  return (
    <div onClick={expenseDownloader}>
      <RiDownloadCloud2Fill style={{ width: "30px", height: "30px" }} />
    </div>
  );
};
export default PreviousExpenseDownloadButton;
