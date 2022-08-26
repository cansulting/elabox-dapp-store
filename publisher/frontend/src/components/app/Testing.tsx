import { TestingProps } from "../../interfaces/testing"
import TestingStyle from "../../assets/css/components/app/testing.module.css"
import FormStyle from "../../assets/css/form.module.css"
function Testing(props: TestingProps): JSX.Element {
  return (
    <div className={TestingStyle["app-testing"]}>
      <h1>Testing</h1>
      <form className={FormStyle["form"]}>
        <div className={FormStyle["form-body"]}>
          <label>Enable</label>
          <input type="checkbox" name="enable" checked={props.enabled} />
        </div>
        <div className={FormStyle["form-body"]}>
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
      </form>
    </div>
  )
}
export default Testing
