import React, { useState, useEffect } from "react";
import CustomDataTable from "../../components/DataTable/DataTable";
import Search from "../../components/search/Search";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  fetchSalesData,
  deleteSalesData,
  searchSalesData,
  filterBarangSalesData,
} from "../../components/api/SalesApi";
import SalesModal from "./SalesModal";
import Swal from "sweetalert2";
import { fetchKategoriBarangData } from "../../components/api/KategoriApi";

const Sales = () => {
  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Nama Barang",
      selector: (row) => row.nama_barang,
      sortable: true,
    },
    {
      name: "Stok",
      selector: (row) => row.stok,
      sortable: true,
    },
    {
      name: "Terjual",
      selector: (row) => row.terjual,
      sortable: true,
    },
    {
      name: "Tanggal Transaksi",
      selector: (row) => row.tanggal_transaksi,
      sortable: true,
    },
    {
      name: "Jenis Barang",
      selector: (row) => row.jenis_barang,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <Button
            variant="warning"
            size="sm"
            className="mr-2"
            onClick={() => handleEdit(row)}
          >
            Edit
          </Button>
          {"  "}
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDelete(row.id)}
          >
            Hapus
          </Button>
        </div>
      ),
    },
  ];

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [kategori, setKategori] = useState([]);
  const [selectedKategori, setSelectedKategori] = useState("");

  const handleShow = () => {
    setEditData(null);
    setIsEditMode(false);
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  const getKategori = async () => {
    const data = await fetchKategoriBarangData();
    console.log(data.data);
    setKategori(data.data);
  };

  const getSalesData = async () => {
    try {
      const salesData = await fetchSalesData();
      console.log(salesData);
      setData(salesData);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  useEffect(() => {
    getKategori();
    getSalesData();
  }, []);

  const handleSearch = async (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm) {
      try {
        const filteredData = await searchSalesData(searchTerm);
        setData(filteredData);
      } catch (error) {
        console.error("Error searching sales data:", error);
      }
    } else {
      getSalesData();
    }
  };

  const handleEdit = (row) => {
    setEditData(row);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Konfirmasi Form",
      text: "Apakah Anda Yakin Menghapus data ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Iya",
      cancelButtonText: "Tidak",
    });

    if (result.isConfirmed) {
      try {
        await deleteSalesData(id);
        await getSalesData();
        Swal.fire("Sukses", "Data berhasil dihapus.", "success");
      } catch (error) {
        console.error("Error deleting sales data:", error);
        Swal.fire(
          "Gagal",
          "Terjadi kesalahan saat saat menghapus data.",
          "error"
        );
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire("Batal", "Hapus data dibatalkan.", "info");
    }
  };

  const handleFilterChange = async (e) => {
    const kategori = e.target.value;
    setSelectedKategori(kategori);
    if (kategori !== 'null') {
      try {
        const filteredData = await filterBarangSalesData(kategori);
        setData(filteredData);
      } catch (error) {
        console.error("Error filtering kategori data:", error);
      }
    } else {
      getSalesData();
    }
  };

  return (
    <div className="Sales">
      <div>
        <h3>Data Penjualan</h3>
      </div>
      <br />
      <div>
        <Row>
          <Col>
            <Button variant="outline-success" onClick={handleShow}>
              Input Penjualan
            </Button>{" "}
          </Col>
          <Col>
            <Row>
              <Col>
                <Search onSearch={handleSearch} />
              </Col>
              <Col>
                <Form.Select aria-label="Default select example" onChange={handleFilterChange}>
                  <option value="null">Jenis Barang</option>
                  {kategori.map((gg) => (
                    <option key={gg.id} value={gg.id}>
                      {gg.nama_kategori}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <br />
      <CustomDataTable columns={columns} data={data} />

      <SalesModal
        show={showModal}
        handleClose={handleClose}
        refreshData={getSalesData}
        isEditMode={isEditMode}
        editData={editData}
      />
    </div>
  );
};

export default Sales;
