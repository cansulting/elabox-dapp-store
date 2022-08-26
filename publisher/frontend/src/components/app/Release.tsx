import ReleaseStyle from "../../assets/css/components/app/release.module.css"
import FormStyle from "../../assets/css/form.module.css"
import ButtonStyle from "../../assets/css/button.module.css"
import { ReleaseProps } from "../../interfaces/release"
function Release(props: ReleaseProps): JSX.Element {
  const handleReleaseClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    props.onReleaseSave()
  }
  return (
    <div className={ReleaseStyle["app-release"]}>
      <h2>Latest Release</h2>
      <div className={ReleaseStyle["build"]}>
        <div className={ReleaseStyle["build-info"]}>
          <label>Build</label>
          <p>1</p>
        </div>
        <div className={ReleaseStyle["build-info"]}>
          <label>Updates</label>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
            delectus laborum dolorem beatae quo rem cum veritatis iusto labore,
            maiores hic, provident veniam perspiciatis laboriosam inventore
            ipsum voluptates nesciunt reprehenderit.
          </p>
        </div>
      </div>

      <h2>Add New Release</h2>
      <form className={FormStyle["form"]}>
        <div
          className={`${FormStyle["form-body"]} ${FormStyle["form-body-column"]}`}
        >
          <div
            className={`${FormStyle["form-body"]} ${FormStyle["form-body-full"]}`}
          >
            <label>Build</label>
            <input type="text" name="build" placeholder="Build" />
          </div>
          <div
            className={`${FormStyle["form-body"]} ${FormStyle["form-body-full"]}`}
          >
            <label>Updates</label>
            <textarea name="updates" placeholder="updates" />
          </div>
        </div>
        <div className={`${ButtonStyle["group-flex-end"]}`}>
          <button className={ButtonStyle["ghost"]}>Cancel</button>
          <button
            className={ButtonStyle["primary"]}
            onClick={handleReleaseClick}
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  )
}
export default Release