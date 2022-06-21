import moment from "moment";
import { useDispatch } from "react-redux";
import { onHover } from "../../redux/mapSlice";
import { useRouter } from "next/router";
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'


TimeAgo.addDefaultLocale(en)

const PostJobCard = ({ job }) => {
  const { description, _id, category, postedBy, price, title, createAt } = job;
  const dispatch = useDispatch();
  const router = useRouter();
  
  return (
    <>
      <div
        className="job"
        onClick={() => router.push(`/works/${_id}`)}
        onMouseEnter={() => dispatch(onHover(job))}
      >
        <div className="job_header">
          <h3>{title?.substring(0, 15)}...</h3>
          <p>{category}</p>
        </div>
        <div className="job_description">
          <p>{description?.substring(0, 20)}...</p>
        </div>
        <div className="job_footer">
          <div className="left">
            <h3>
              <span  style={{
              textTransform: "capitalize",
            }}>{postedBy?.fullname}</span>
            </h3>
            <p>
              <span><ReactTimeAgo date={createAt} locale="en-US"/></span>
            </p>
          </div>
          <div className="right">
            <h3>${price}</h3>
            <p>Budget</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostJobCard;
