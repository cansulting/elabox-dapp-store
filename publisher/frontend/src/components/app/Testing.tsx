import { TestingProps } from "../../interfaces/testing"
import TestingStyle from "../../assets/css/components/app/testing.module.css"
import FormStyle from "../../assets/css/form.module.css"
import ButtonStyle from "../../assets/css/button.module.css"
function Testing(props: TestingProps): JSX.Element {
  return (
    <div className={TestingStyle["app-testing"]}>
      <h1>Testing</h1>
      <form className={FormStyle["form"]}>
        <div
          className={`${FormStyle["form-body"]} ${FormStyle["form-body-column"]}`}
        >
          <div
            className={`${FormStyle["form-body"]} ${FormStyle["form-body-full"]}`}
          >
            <label>Enable</label>
            <input type="checkbox" name="enable" checked={props.enabled} />
          </div>
          <div
            className={`${FormStyle["form-body"]} ${FormStyle["form-body-full"]}`}
          >
            <label>Users</label>
            <input type="text" name="user" placeholder="Hit enter to add" />
          </div>
          <div
            className={`${FormStyle["form-body"]} ${TestingStyle["app-users"]}`}
          >
            {props.users.map((user) => (
              <div className={TestingStyle["app-user"]} key={user.id}>
                {user.name}
              </div>
            ))}
          </div>
        </div>
        <div className={`${ButtonStyle["group-flex-end"]}`}>
          <button className={ButtonStyle["ghost"]}>Cancel</button>
          <button className={ButtonStyle["primary"]}>Apply</button>
        </div>
      </form>
    </div>
  )
}
export default Testing
