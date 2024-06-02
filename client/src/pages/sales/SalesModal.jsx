import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { fetchKategoriBarangData } from "../../components/api/KategoriApi";
import { createSalesData, updateSalesData } from '../../components/api/SalesApi';
import Swal from 'sweetalert2';

const SalesModal = ({
  show,
  handleClose,
  refreshData,
  isEditMode,
  editData,
}) => {
  const [formData, setFormData] = useState({
    nama_barang: "",
    stok: 0,
    terjual: 0,
    tanggal_transaksi: "",
    jenis_barang: "",
  });

  const [kategori, setKategori] = useState([]);

  const getKategori = async () => {
    const data = await fetchKategoriBarangData();
    console.log(data.data);
    setKategori(data.data);
  };

  useEffect(() => {
    getKategori();
    if (isEditMode && editData) {
      setFormData(editData);
    } else {
      setFormData({
        nama_barang: "",
        stok: 0,
        terjual: 0,
        tanggal_transaksi: "",
        jenis_barang: "",
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
          await updateSalesData(formData.id, formData);
        } else {
          await createSalesData(formData);
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
          `Error ${isEditMode ? "updating" : "creating"} sales data:`,
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
          {isEditMode ? "Edit Data Penjualan" : "Input Data Penjualan"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="nama_barang">
            <Form.Label>Nama Barang</Form.Label>
            <Form.Control
              type="text"
              name="nama_barang"
              value={formData.nama_barang}
              onChange={handleChange}
              placeholder=""
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="stok">
            <Form.Label>Stok</Form.Label>
            <Form.Control
              type="number"
              name="stok"
              value={formData.stok}
              onChange={handleChange}
              placeholder=""
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="terjual">
            <Form.Label>Terjual</Form.Label>
            <Form.Control
              type="number"
              name="terjual"
              value={formData.terjual}
              onChange={handleChange}
              placeholder=""
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="tanggal_transaksi">
            <Form.Label>Tanggal Transaksi</Form.Label>
            <Form.Control
              type="date"
              name="tanggal_transaksi"
              value={formData.tanggal_transaksi}
              onChange={handleChange}
              placeholder=""
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="jenis_barang">
            <Form.Label>Jenis Barang</Form.Label>
            <br />
            <Form.Select
              aria-label="Default select example"
              name="jenis_barang"
              value={formData.jenis_barang}
              onChange={handleChange}
            >
              <option value="">Pilih Jenis Barang</option>
              {kategori.map((gg) => (
                <option key={gg.id} value={gg.id}>
                  {gg.nama_kategori}
                </option>
              ))}
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

export default SalesModal;
