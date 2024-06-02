import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { fetchKategoriData, createKategoriData, updateKategoriData } from "../../components/api/KategoriApi";
import Swal from "sweetalert2";

const KategoriModal = ({
  show,
  handleClose,
  refreshData,
  isEditMode,
  editData,
}) => {
  const [formData, setFormData] = useState({
    nama_kategori: "",
    jenis_kategori: "",
  });

  const [kategori, setKategori] = useState([]);

  const getKategori = async () => {
    const data = await fetchKategoriData();
    console.log(data.data);
    setKategori(data.data);
  };

  useEffect(() => {
    getKategori();
    if (isEditMode && editData) {
      setFormData({
        id: editData.id,
        nama_kategori: editData.nama_kategori,
        jenis_kategori: editData.jenis_kategori,
      });
    } else {
      setFormData({
        id: "",
        nama_kategori: "",
        jenis_kategori: "",
      });
    }
  }, [isEditMode, editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await Swal.fire({
      title: "Konfirmasi Form",
      text: `Apakah Anda yakin ingin ${
        isEditMode ? "mengupdate" : "menambahkan"
      } data ini?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Iya",
      cancelButtonText: "Tidak",
    });

    if (result.isConfirmed) {
      try {
        if (isEditMode) {
          await updateKategoriData(formData.id, formData);
        } else {
          await createKategoriData(formData);
        }
        await refreshData();
        Swal.fire(
          "Sukses",
          `Data berhasil ${isEditMode ? "diupdate" : "ditambahkan"}.`,
          "success"
        );
        handleClose();
      } catch (error) {
        console.error(
          `Error ${isEditMode ? "updating" : "creating"} kategori data:`,
          error
        );
        Swal.fire(
          "Gagal",
          `Terjadi kesalahan saat ${
            isEditMode ? "mengupdate" : "menambahkan"
          } data.`,
          "error"
        );
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        "Batal",
        `${isEditMode ? "Update" : "Tambah"} data dibatalkan.`,
        "info"
      );
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEditMode ? "Edit Kategori" : "Input Kategori"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="nama_kategori">
            <Form.Label>Nama Kategori</Form.Label>
            <Form.Control
              type="text"
              name="nama_kategori"
              value={formData.nama_kategori}
              onChange={handleChange}
              placeholder=""
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="jenis_kategori">
            <Form.Label>Jenis Kategori</Form.Label>
            <br />
            <Form.Select
              aria-label="Default select example"
              name="jenis_kategori"
              value={formData.jenis_kategori}
              onChange={handleChange}
            >
              <option value="">Pilih Jenis Kategori</option>
              <option value="barang">Barang</option>
              <option value="pembayaran">Pembayaran</option>
            </Form.Select>
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              {isEditMode ? "Update" : "Submit"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default KategoriModal;
