import React, {PureComponent} from "react";
import Template from "../template/user/Template";
import logo from "../images/logo.png";

class About extends PureComponent {
    render() {
        return (
            <Template>
                <div className="container text-justify">
                    <h3 className="m-0 text-center">Bantuan</h3>
                    <div className="text-center mt-5">
                        <a href="https://web.facebook.com/groups/696112671381885" target="_blank">
                            <img src={logo} alt="Logo" className="w-25"/>
                        </a>
                    </div>
                    <h5 className="mt-3 mb-0 fw-normal text-center">Selamat Datang di Situs Freshwaterfish of Indonesia</h5>
                    <h5 className="mt-3 mb-0 fw-normal">Berikut adalah penjelasan mengenai cara menggunakan web ini dengan baik</h5>
                    <ul className="mt-3">
                        <li>User dapat melakukan Registrasi Akun agar dapat menggunakan fitur yang ada seperti submit observasi dan berkomentar.</li>
                        <li>User dapat Submit Observation dengan memasukkan data observasi, pinpoint lokasi penemuan dan memasukkan foto-foto observasi.</li>
                        <li>Observasi yang sudah disubmit akan dilihat oleh Administrator sebelum dipublikasi.</li>
                        <li>Hasil yang sudah dipublikasi namun terdapat kesalahan data hanya dapat diedit oleh Admin.</li>
                        <li>Untuk bantuan lainnya bisa ditanyakan di Grup Komunitas Freshwater Fish of Indonesia di Platform Facebook.</li>
                    </ul>
                </div>
            </Template>
        );
    }
}

export default About;
