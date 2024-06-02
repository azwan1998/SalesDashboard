import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { fetchSalesData, countData } from "../../components/api/HomeApi";
import { fetchKategoriBarangData } from "../../components/api/KategoriApi";
import "./Home.css";

const Home = () => {
  const [salesData, setSalesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [jenisBarang, setJenisBarang] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [total, setTotal] = useState("");

  const getTotalData = async () => {
    try {
      const data = await countData();
      setTotal(data);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  const getSalesData = async (filters) => {
    try {
      const data = await fetchSalesData(filters);
      setSalesData(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  const [kategori, setKategori] = useState([]);

  const getKategori = async () => {
    const data = await fetchKategoriBarangData();
    console.log(data.data);
    setKategori(data.data);
  };

  useEffect(() => {
    getKategori(),
      getSalesData({
        startDate,
        endDate,
        jenisBarang,
        filterBy,
      });
    getTotalData();
  }, [startDate, endDate, jenisBarang, filterBy]);

  const handleFilter = () => {
    getSalesData({
      startDate,
      endDate,
      jenisBarang,
      filterBy,
    });
  };

  const topProducts = [...filteredData]
    .sort((a, b) => b[filterBy] - a[filterBy])
    .slice(0, 3);
  const bottomProducts = [...filteredData]
    .sort((a, b) => a[filterBy] - b[filterBy])
    .slice(0, 3);

  return (
    <div className="Home">
      <Row className="mb-4">
        <Col>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Produk</Card.Title>
              <Card.Text>{total.totalProduct}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Stok Produk</Card.Title>
              <Card.Text>{total.totalStok}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Penjualan</Card.Title>
              <Card.Text>{total.totalTerjual}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Jenis Produk</Card.Title>
              <Card.Text>{total.totalJenis}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="startDate">
                <Form.Label>Tanggal Mulai</Form.Label>
                <Form.Control
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="endDate">
                <Form.Label>Tanggal Selesai</Form.Label>
                <Form.Control
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="jenisBarang">
                <Form.Label>Jenis Barang</Form.Label>
                <Form.Control
                  as="select"
                  value={jenisBarang}
                  onChange={(e) => setJenisBarang(e.target.value)}
                >
                  <option value="">Pilih...</option>
                  {kategori.map((gg) => (
                    <option key={gg.id} value={gg.id}>
                      {gg.nama_kategori}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="filterBy">
                <Form.Label>Filter Berdasarkan</Form.Label>
                <Form.Control
                  as="select"
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                >
                  <option value="">Pilih...</option>
                  <option value="terjual">Terjual</option>
                  <option value="stok">Stok</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col className="align-self-end">
              <Button variant="primary" onClick={handleFilter}>
                Filter
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>
                Produk {filterBy === "terjual" ? "Terjual" : "Stok"} Tertinggi
              </Card.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Barang</th>
                    <th>Stok</th>
                    <th>Terjual</th>
                    <th>Tanggal Transaksi</th>
                    <th>Jenis Barang</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.nama_barang}</td>
                      <td>{item.stok}</td>
                      <td>{item.terjual}</td>
                      <td>{item.tanggal_transaksi}</td>
                      <td>{item.jenis_barang}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>
                Produk {filterBy === "terjual" ? "Terjual" : "Stok"} Terendah
              </Card.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Barang</th>
                    <th>Stok</th>
                    <th>Terjual</th>
                    <th>Tanggal Transaksi</th>
                    <th>Jenis Barang</th>
                  </tr>
                </thead>
                <tbody>
                  {bottomProducts.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.nama_barang}</td>
                      <td>{item.stok}</td>
                      <td>{item.terjual}</td>
                      <td>{item.tanggal_transaksi}</td>
                      <td>{item.jenis_barang}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
