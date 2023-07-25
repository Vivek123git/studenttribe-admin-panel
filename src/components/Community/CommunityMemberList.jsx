import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { tableCellClasses } from "@mui/material/TableCell";
import s from "./community.module.css";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import Loder from "../../Loder/Loder";
import DataNotFound from "../ErrorPage/DataNotFound";
import { BiSearch } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import { member_list_api } from "../api/Community";
const CommunityMemberList = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [allmember, setallmember] = useState([]);
  const location = useLocation();
  const [pageCount, setpageCount] = useState(1);
  const [pageLength, setpageLength] = useState();

  console.log(location?.state?.data.id);
  useEffect(() => {
    fetchAllmemberlist();
  }, [pageCount]);

  async function fetchAllmemberlist(data) {
    setisLoading(true);
    try {
      const temp = {
        page: pageCount,
        limit: 8,
        community_id: location?.state?.data?.id,
      };
      let res = await member_list_api(temp);
      if (res.data.status) {
        console.log(res);
        let calPageLength = Math.ceil(res.data.count / 8);
        setpageLength(calPageLength);
        setallmember(res.data.results);
        setisLoading(false);
      } else {
        setisLoading(false);
        console.log("status false!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "var(--clr-primary)",
      color: theme.palette.common.white,
      fontWeight: "bold",
      borderRight: "1px solid #fff",
      overflow: "hidden",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      border: "none",
      borderLeft: "2px solid #00000011",
      "&:last-child": {
        borderRight: "2px solid #00000011",
      },
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    borderBottom: "2px solid #00000011",
  }));

  return (
    <div className="container">
      <div className={s["article-list-title"]}>
        <h3>Community Member List</h3>
      </div>
      <div className={s["user-list-heading"]}>
        <div className={s["user-list-title"]}>
          <div className="beat_left">
            <div className={s["title"]} onClick={() => navigate(-1)}>
              <AiOutlineArrowLeft /> Back
            </div>
          </div>
        </div>
        <div className={s["user-list-search"]}>
          <div className={s["search-box"]}>
            <span style={{ paddingRight: "0.5rem" }}>
              <BiSearch size={23} />
            </span>
            <input type="text" spellCheck="false" onChange={(e) => fetchAllmemberlist(e.target.value)} placeholder="Search by name..." />
          </div>
        </div>
      </div>

      <div className="beat_table">
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Image</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Mobile</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allmember.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>{row.profile_img ? <img style={{ height: "2rem", width: "3rem" }} src={row.profile_img} alt="" /> : null}</StyledTableCell>
                <StyledTableCell>{row.user_name} </StyledTableCell>
                <StyledTableCell align="center">{row.user_email} </StyledTableCell>
                <StyledTableCell align="center">{row.user_number}</StyledTableCell>
                <StyledTableCell align="center">{row.status}</StyledTableCell>
                <StyledTableCell align="center">{row.Created_date}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        {allmember.length <= 0 && <DataNotFound />}
        {allmember?.length > 0 && (
          <div className={s["pagination"]}>
            <Pagination count={pageLength} size="large" style={{ color: "#D21903" }} onChange={(e, value) => setpageCount(value)} page={pageCount} />
          </div>
        )}
      </div>

      <Loder loading={isLoading} />
    </div>
  );
};

export default CommunityMemberList;
