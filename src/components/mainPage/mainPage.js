import maincss from "./mainPage.module.css";
const MainPage = () => {
  return (
    <div className={maincss.container}>
      <div className={maincss.parent}>
        <div className={maincss.singleCard}>add expense</div>
      </div>

      <div className={maincss.parent}>
        <div className={maincss.doubleCard}>see expense</div>
        <div className={maincss.doubleCard}>buy membership</div>
      </div>
      <div className={maincss.parent}>
        <div className={maincss.doubleCard}>leaderboard</div>
        <div className={maincss.doubleCard}>download</div>
      </div>
    </div>
  );
};
export default MainPage;
