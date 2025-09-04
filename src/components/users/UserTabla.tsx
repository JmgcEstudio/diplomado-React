import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
  type GridRenderCellParams,
} from '@mui/x-data-grid';
import type { UserType } from './type';
import { Box, Chip, IconButton, Stack, Tooltip } from '@mui/material';
import {
  Edit as EditIcon,
  PersonOff as PersonOffIcon,
  Person as PersonIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import type { GridSortModel } from '@mui/x-data-grid';

interface Props {
  users: UserType[];
  rowCount: number;
  paginationModel: GridPaginationModel;
  setPaginationModel: (model: GridPaginationModel) => void;
  sortModel: GridSortModel;
  setSortModel: (model: GridSortModel) => void;
  handleDelete: (id: number) => void;
  handleToggleStatus: (id: number, currentStatus: string) => void;
  handleOpenEditDialog: (user: UserType) => void;
}

export const UserTabla = ({
  users,
  rowCount,
  paginationModel,
  setPaginationModel,
  setSortModel,
  sortModel,
  handleDelete,
  handleToggleStatus,
  handleOpenEditDialog
}: Props) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'username', headerName: 'Usuario', flex: 1 },
    {
      field: 'status',
      headerName: 'Estado',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value === 'active' ? 'Activo' : 'Inactivo'}
          color={params.value === 'active' ? 'success' : 'error'}
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Fecha Creación',
      width: 180,
      renderCell: (params: GridRenderCellParams) => (
        new Date(params.value).toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      ),
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      sortable: false,
      filterable: false,
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction={'row'} spacing={1}>
          <Tooltip title="Editar">
            <IconButton size="small" onClick={() => handleOpenEditDialog(params.row)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={
              params.row.status === 'active' ? 'Inactivar usuario' : 'Activar usuario'
            }
          >
            <IconButton
              size="small"
              color={params.row.status === 'active' ? 'error' : 'success'}
              onClick={() => handleToggleStatus(params.row.id, params.row.status)}
            >
              {params.row.status === 'active' ? (
                <PersonOffIcon fontSize="small" />
              ) : (
                <PersonIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>

          <Tooltip title="Eliminar">
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Box height={545}>
      <DataGrid
        rows={users}
        columns={columns}
        rowCount={rowCount}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sortingMode={'server'}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        pageSizeOptions={[5, 10, 20]}
        disableColumnFilter
      />
    </Box>
  );
};