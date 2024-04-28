import { useEffect, useState } from "react";
import { getFavoriteVideoList } from "../api/getFavoriteVideoList";
import { FavoriteVideo } from "../types";
import camelcaseKeys from "camelcase-keys";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteFavoriteVideo } from "../api/deleteFavoriteVideo";

interface Column {
  id: "thumbnailLink" | "title" | "channelTitle" | "action";
  label: string;
  minWidth?: number;
  align?: "left" | "center";
}

const columns: readonly Column[] = [
  { id: "thumbnailLink", label: "", minWidth: 70 },
  { id: "title", label: "name", minWidth: 170 },
  {
    id: "channelTitle",
    label: "channelTitle",
    minWidth: 170,
    align: "left",
  },
  { id: "action", label: "action", minWidth: 50, align: "center" },
];

export const Favorite = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [favoriteVideoList, setFavoriteVideoList] = useState<FavoriteVideo[]>(
    []
  );

  useEffect(() => {
    refreshFavoriteVideoList();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const refreshFavoriteVideoList = () => {
    getFavoriteVideoList()
      .then((res) => res.json())
      .then((data) => {
        const camelCaseData = camelcaseKeys(data, { deep: true });
        setFavoriteVideoList(camelCaseData);
      });
  };

  const showCaption = (videoId: string) => {
    navigate(`/caption/${videoId}`, { state: { videoId: videoId } });
  };

  const deleteFavorite = (e: React.MouseEvent, favoriteId: number) => {
    e.stopPropagation();
    deleteFavoriteVideo(favoriteId).then(() => refreshFavoriteVideoList());
  };

  return (
    <div>
      {favoriteVideoList.length && (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {favoriteVideoList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        onClick={() => showCaption(row.videoId)}
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell align="center">
                          <img alt="thumbnail" src={row.thumbnailLink} />
                        </TableCell>
                        <TableCell align="left">{row.title}</TableCell>
                        <TableCell align="left">{row.channelTitle}</TableCell>
                        <TableCell align="center">
                          <Button onClick={(e) => deleteFavorite(e, row.id)}>
                            <DeleteIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={favoriteVideoList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </div>
  );
};
