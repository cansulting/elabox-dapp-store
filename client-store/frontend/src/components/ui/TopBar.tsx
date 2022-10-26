import DashboardStyle from "../../assets/css/pages/dashboard.module.css"
import ButtonStyle from "../../assets/css/button.module.css"

function TopBar(props:any) {
    return (
        <div className={DashboardStyle["app-dashboard-header"]}>
            <button className={ButtonStyle['ghost']} onClick={props.onExploreClick}>Explore Stores</button>
        </div>
    )
}

export default TopBar