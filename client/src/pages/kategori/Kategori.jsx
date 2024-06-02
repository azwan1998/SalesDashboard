import React, { useState, useEffect } from "react";
import CustomDataTable from "../../components/DataTable/DataTable";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  fetchKategoriData,
  deleteKategoriData,
  filterKategoriData,
} from "../../components/api/KategoriApi";
import KategoriModal from "./KategoriModal";
import Swal from "sweetalert2";

const Kategori = () => {
  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Nama Kategori",
      selector: (row) => row.nama_kategori,
      sortable: true,
    },
    {
      name: "Jenis Kategori",
      selector: (row) => row.jenis_kategori,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => row.created_at,
      sortable: true,
    },
    {
      name: "Updated At",
      selector: (row) => row.updated_at,
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
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [selectedKategori, setSelectedKategori] = useState("");

  const handleShow = () => {
    setEditData(null);
    setIsEditMode(false);
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  const getKategoriData = async () => {
    try {
      const kategoriData = await fetchKategoriData();
      console.log(kategoriData);
      setData(kategoriData);
    } catch (error) {
      console.error("Error fetching kategori data:", error);
    }
  };

  useEffect(() => {
    getKategoriData();
  }, []);

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
        await deleteKategoriData(id);
        await getKategoriData();
        Swal.fire("Sukses", "Data berhasil dihapus.", "success");
      } catch (error) {
        console.error("Error deleting kategori data:", error);
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
        const filteredData = await filterKategoriData(kategori);
        setData(filteredData);
      } catch (error) {
        console.error("Error filtering kategori data:", error);
      }
    } else {
      getKategoriData();
    }
  };

  return (
    <div className="kategori">
      <div>
        <h3>Kategori</h3>
      </div>
      <br />
      <div>
        <Row>
          <Col>
            <Button variant="outline-success" onClick={handleShow}>
              Input Kategori
            </Button>{" "}
          </Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col>
            <Form.Select aria-label="Default select example" onChange={handleFilterChange}>
              <option value="null">Jenis Kategori</option>
              <option value="barang">Barang</option>
              <option value="pembayaran">Pembayaran</option>
            </Form.Select>
          </Col>
        </Row>
      </div>
      <br />
      <CustomDataTable columns={columns} data={data} />

      <KategoriModal
        show={showModal}
        handleClose={handleClose}
        refreshData={getKategoriData}
        isEditMode={isEditMode}
        editData={editData}
      />
    </div>
  );
};

export default Kategori;
