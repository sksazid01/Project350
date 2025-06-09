import { Link, NavLink, useParams } from 'react-router-dom';
import { DataTable } from 'mantine-datatable';
import { useState, useEffect } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../redux/themeConfigSlice';
import IconTrashLines from '../components/Icon/IconTrashLines';
import IconPlus from '../components/Icon/IconPlus';
import IconEye from '../components/Icon/IconEye';
import { MantineProvider, createTheme, MantineThemeProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import 'mantine-datatable/styles.css';
import api from '../utils/axiosInstance';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Dark theme configuration for Mantine
const darkTheme = createTheme({
  colorScheme: 'dark',
});

const List = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { clubId } = useParams(); // Get the clubId from the route params

  useEffect(() => {
    dispatch(setPageTitle('Pending Members'));

    // Fetch pending members for the club
    const fetchPendingMembers = async () => {
      try {
        // Check if user has the required role (moderator or admin)
        if (!currentUser || (currentUser.role !== 'moderator' && currentUser.role !== 'admin')) {
          setError('You do not have permission to view pending members. Only moderators and admins can access this page.');
          setLoading(false);
          return;
        }

        const response = await api.post(`/clubs/${clubId}/pendings`, {
          moderatorId: currentUser.id,
        });
        setItems(response.data); // Assuming response.data contains the pending members
      } catch (err) {
        console.error('Error fetching pending members:', err);
        setError('Failed to load pending members: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchPendingMembers();
  }, [dispatch, clubId, currentUser?.id, currentUser?.role]);

  const removeSelectedMembers = async () => {
    try {
      if (selectedRecords.length === 0) {
        return Swal.fire('Error', 'Please select members to remove.', 'error');
      }
      const response = await api.delete(`/clubs/${clubId}/pendings`, {
        data: { memberIds: selectedRecords.map(record => record.id) }
      });
      // Update the items state to remove the deleted members
      setItems(items.filter(item => !selectedRecords.some(record => record.id === item.id)));
      setSelectedRecords([]);
      Swal.fire('Success', 'Selected members have been removed from the pending list.', 'success');
    } catch (err) {
      Swal.fire('Error', 'Failed to remove selected members.', 'error');
    }
  };

  const approveSelectedMembers = async () => {
    try {
      if (selectedRecords.length === 0) {
        return Swal.fire('Error', 'Please select members to approve.', 'error');
      }
      const response = await api.post(`/clubs/${clubId}/approve`, {
        memberIds: selectedRecords.map(record => record.id),
      });
      // Update the items state to remove approved members
      setItems(items.filter(item => !selectedRecords.some(record => record.id === item.id)));
      setSelectedRecords([]);
      Swal.fire('Success', 'Selected members have been approved.', 'success');
    } catch (err) {
      Swal.fire('Error', 'Failed to approve selected members.', 'error');
    }
  };

  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [initialRecords, setInitialRecords] = useState([]);
  const [records, setRecords] = useState([]);
  const [selectedRecords, setSelectedRecords] = useState([]);

  const [search, setSearch] = useState('');
  const [sortStatus, setSortStatus] = useState({
    columnAccessor: 'name',
    direction: 'asc',
  });

  useEffect(() => {
    if (!loading) {
      setInitialRecords(sortBy(items, 'name'));
    }
  }, [items, loading]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords([...initialRecords.slice(from, to)]);
  }, [page, pageSize, initialRecords]);

  useEffect(() => {
    const filtered = items.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) || item.email.toLowerCase().includes(search.toLowerCase()));
    setInitialRecords(sortBy(filtered, 'name'));
  }, [search, items]);

  useEffect(() => {
    const sorted = sortBy(initialRecords, sortStatus.columnAccessor);
    setRecords(sortStatus.direction === 'desc' ? sorted.reverse() : sorted);
    setPage(1);
  }, [sortStatus, initialRecords]);

  if (loading) return <div className="text-white-dark">Loading...</div>;
  if (error) return <div className="text-white-dark">{error}</div>;
  
  const MySwal = withReactContent(Swal);
  const showAlert = async (userId) => {
    try {
      const transaction = await api.get(`/sslcommerz/transaction/${userId}`);
      const data = transaction.data;

      MySwal.fire({
        title: 'Transaction Details',
        html: `
          <div class="text-left">
            <p><strong>Transaction ID:</strong> ${data.tranId}</p>
            <p><strong>Amount:</strong> ${data.amount} ${data.currency}</p>
            <p><strong>Payment Status:</strong> ${data.paymentStatus}</p>
            <p><strong>User Name:</strong> ${data.userName}</p>
            <p><strong>User Email:</strong> ${data.userEmail}</p>
            <p><strong>User Phone:</strong> ${data.userPhone}</p>
            <p><strong>Created At:</strong> ${new Date(data.createdAt).toLocaleString()}</p>
            <p><strong>Updated At:</strong> ${new Date(data.updatedAt).toLocaleString()}</p>
          </div>
        `,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: 'Close',
        customClass: {
          popup: 'sweet-alerts',
        },
        background: '#1b2e4b',
        color: '#ffffff',
      });
    } catch (error) {
      console.error('Error fetching transaction:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to fetch transaction.',
        icon: 'error',
        background: '#1b2e4b',
        color: '#ffffff',
      });
    }
  };

  return (
    <div className="bg-[#0e1726] min-h-screen text-white-dark">
      <div className="space-y-6">
        <ol className="flex text-primary font-semibold">
          <li className="bg-[#1b2e4b] ltr:rounded-l-md rtl:rounded-r-md">
            <Link to="/" className="p-1.5 ltr:pl-3 rtl:pr-3 ltr:pr-2 rtl:pl-2 relative h-full flex items-center before:absolute ltr:before:-right-[15px] rtl:before:-left-[15px] rtl:before:rotate-180 before:inset-y-0 before:m-auto before:w-0 before:h-0 before:border-[16px] before:border-l-[15px] before:border-r-0 before:border-t-transparent before:border-b-transparent before:border-l-[#1b2e4b] before:z-[1] hover:text-primary/70">
              Home
            </Link>
          </li>
          <li className="bg-[#1b2e4b]">
            <Link to="/clubs" className="bg-primary text-white-light p-1.5 ltr:pl-6 rtl:pr-6 ltr:pr-2 rtl:pl-2 relative h-full flex items-center before:absolute ltr:before:-right-[15px] rtl:before:-left-[15px] rtl:before:rotate-180 before:inset-y-0 before:m-auto before:w-0 before:h-0 before:border-[16px] before:border-l-[15px] before:border-r-0 before:border-t-transparent before:border-b-transparent before:border-l-primary before:z-[1]">
              Clubs
            </Link>
          </li>
          <li className="bg-[#1b2e4b]">
            <button className="p-1.5 px-3 ltr:pl-6 rtl:pr-6 relative h-full flex items-center before:absolute ltr:before:-right-[15px] rtl:before:-left-[15px] rtl:before:rotate-180 before:inset-y-0 before:m-auto before:w-0 before:h-0 before:border-[16px] before:border-l-[15px] before:border-r-0 before:border-t-transparent before:border-b-transparent before:border-l-[#1b2e4b] before:z-[1] hover:text-primary/70">
              Pending Members
            </button>
          </li>
        </ol>
      </div>
      
      <MantineProvider theme={darkTheme}>
        <div className="pt-5">
          <div className="panel px-0 border-[#1b2e4b] bg-[#1b2e4b]">
            <div className="panel mt-6 bg-[#1b2e4b]">
              <div className="flex flex-wrap justify-between items-center mb-5">
                <h5 className="font-semibold text-lg text-white-light">Pending Members</h5>
                {!error && (
                  <div className="flex items-center gap-2">
                    <button type="button" className="btn btn-danger btn-sm" onClick={() => removeSelectedMembers(selectedRecords.map((record) => record.id))}>
                      <IconTrashLines className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                      Delete
                    </button>
                    <button className="btn btn-primary gap-2" onClick={approveSelectedMembers}>
                      <IconPlus />
                      Approve Selected
                    </button>
                  </div>
                )}
              </div>
              
              {error && (
                <div className="bg-red-900/50 border border-red-600 text-red-300 px-4 py-3 rounded relative mb-4" role="alert">
                  <strong className="font-bold">Error: </strong>
                  <span className="block sm:inline">{error}</span>
                </div>
              )}

              {!error && (
                <div className="datatables pagination-padding">
                  <DataTable
                    className="whitespace-nowrap table-hover invoice-table"
                    records={records}
                    columns={[
                      {
                        accessor: 'name',
                        sortable: true,
                        render: ({ name }) => <div className="font-semibold text-white-light">{name}</div>,
                      },
                      {
                        accessor: 'email',
                        sortable: true,
                        render: ({ email }) => <div className="text-white-dark">{email}</div>,
                      },
                      {
                        accessor: 'transaction',
                        sortable: true,
                        render: ({ id }) => (
                          <button onClick={() => showAlert(id)} type="button" className="flex hover:text-primary text-white-dark">
                            <IconEye />
                          </button>
                        ),
                      },
                      {
                        accessor: 'status',
                        sortable: true,
                        render: () => <span className="badge badge-outline-danger">Pending</span>,
                      },
                      {
                        accessor: 'action',
                        title: 'Actions',
                        sortable: false,
                        textAlignment: 'center',
                        render: ({ id }) => (
                          <div className="flex gap-4 items-center w-max mx-auto">
                            <button type="button" className="flex hover:text-danger text-white-dark" onClick={() => removeSelectedMembers([id])}>
                              <IconTrashLines />
                            </button>
                          </div>
                        ),
                      },
                    ]}
                    highlightOnHover
                    totalRecords={initialRecords.length}
                    recordsPerPage={pageSize}
                    page={page}
                    onPageChange={(p) => setPage(p)}
                    recordsPerPageOptions={PAGE_SIZES}
                    onRecordsPerPageChange={setPageSize}
                    sortStatus={sortStatus}
                    onSortStatusChange={setSortStatus}
                    selectedRecords={selectedRecords}
                    onSelectedRecordsChange={setSelectedRecords}
                    paginationText={({ from, to, totalRecords }) => `Showing ${from} to ${to} of ${totalRecords} entries`}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </MantineProvider>
    </div>
  );
};

export default List;