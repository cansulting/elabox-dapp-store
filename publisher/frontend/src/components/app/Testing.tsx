import { useState } from "react"
import { TestingProps } from "../../interfaces/testing"
import TestingStyle from "../../assets/css/components/app/testing.module.css"
import FormStyle from "../../assets/css/form.module.css"
import ButtonStyle from "../../assets/css/button.module.css"
function Testing(props: TestingProps): JSX.Element {
  const [userName, setUserName] = useState("")
  const handleUserSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }
  const handleUserNameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault()
    setUserName(event.target.value)
  }
  const handleUserNameKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      props.onAddUser(userName)
      setUserName("")
    }
  }
  return (
    <div className={TestingStyle["app-testing"]}>
      <form className={FormStyle["form"]} onSubmit={handleUserSubmit}>
        <div
          className={`${FormStyle["form-body"]} ${FormStyle["form-body-column"]}`}
        >
          <div
            className={`
            ${FormStyle["form-body"]} 
            ${FormStyle["form-body-full"]} 
            `}
          >
            <label>Enable</label>
            <div>
              <input type="checkbox" name="enable" checked={props.enabled} />
            </div>
          </div>
          <div
            className={`${FormStyle["form-body"]} ${FormStyle["form-body-full"]}`}
          >
            <label>Users</label>
            <input
              type="text"
              name="user"
              placeholder="Hit enter to add"
              value={userName}
              onChange={handleUserNameInputChange}
              onKeyDown={handleUserNameKeyDown}
            />
          </div>
          <div
            className={`${FormStyle["form-body"]} ${TestingStyle["app-users"]}`}
          >
            {props.users.map((user) => (
              <div className={TestingStyle["app-user"]} key={user.id}>
                {user.name}
                <button className={`${ButtonStyle["ghost"]}`}>X</button>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`${ButtonStyle["group-flex-end"]}`}
          style={{ width: "56%" }}
        >
          <button className={ButtonStyle["ghost-with-border"]}>Cancel</button>
          <button className={ButtonStyle["primary"]}>Apply</button>
        </div>
      </form>
    </div>
  )
}
export default Testing
