import { useSelector } from "react-redux";
import MUIDataTable from "mui-datatables";
import { useGetRecordsQuery, useDeleteRecordMutation } from "./recordsApiSlice";
import { selectCurrentUser } from "../auth/authSlice";

const RecordsList = () => {
  const user = useSelector(selectCurrentUser);

  const [deleteRecordRequest, { data }] = useDeleteRecordMutation();

  const {
    data: records,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetRecordsQuery(user.user_id);

  const columns = [
    "Id",
    "OperationId",
    "Amount",
    "userBalance",
    "operationResponse",
    "Date",
  ];

  const handleDeleteCat = (rowIndex, dataIndex) => {
    const rowToDelete = rowIndex.data[0].dataIndex;
    deleteRecordRequest(records[rowToDelete].id).then(refetch());
  };

  const options = {
    filterType: "checkbox",
    onRowsDelete: (rowData, rowState) => {
      handleDeleteCat(rowData, rowState);
    },
  };

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    content = (
      <section className="users">
        <h1>Records List</h1>

        <MUIDataTable
          title={"Employee List"}
          data={records.map((record) => {
            return [
              record.id,
              record.operationId,
              record.amount,
              record.userBalance,
              record.operationResponse,
              record.createdAt,
            ];
          })}
          columns={columns}
          options={options}
        />
      </section>
    );
  } else if (isError) {
    content = <p>Error: failed records request</p>;
  }

  return content;
};
export default RecordsList;
