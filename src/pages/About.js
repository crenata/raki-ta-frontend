import React, {PureComponent} from "react";
import Template from "../template/user/Template";
import logo from "../images/logo.png";

class About extends PureComponent {
    render() {
        return (
            <Template>
                <div className="container text-justify">
                    <h3 className="m-0 text-center">Tentang Kami</h3>
                    <div className="text-center mt-5">
                        <a href="https://web.facebook.com/groups/696112671381885" target="_blank">
                            <img src={logo} alt="Logo" className="w-25"/>
                        </a>
                    </div>
                    <h5 className="mt-3 mb-0 fw-normal">Komunitas "Freshwater Fish of Indonesia" adalah sebuah komunitas biodiversitas yang berfokus pada pengumpulan data tentang spesies ikan air tawar di Indonesia. Komunitas ini melibatkan partisipasi aktif dari berbagai kalangan, termasuk hobiis ikan, penjual ikan hias, nelayan lokal, akademisi, peneliti ikan dan pecinta ikan lokal lainnya yang memiliki minat dan visi yang sama.</h5>
                    <h5 className="mt-3 mb-0 fw-normal">Tujuan utama komunitas ini adalah untuk mengenal dan mengenalkan ikan asli Indonesia kepada masyarakat Indonesia sendiri. Dengan mengumpulkan data mengenai spesies ikan air tawar di Indonesia, komunitas ini bertujuan untuk meningkatkan pemahaman dan kepedulian terhadap keanekaragaman hayati ikan di Indonesia. Data yang dikumpulkan meliputi informasi tentang nama, deskripsi, habitat, perilaku, dan aspek lain dari ikan-ikan tersebut.</h5>
                    <h5 className="mt-3 mb-0 fw-normal">Pengumpulan data dilakukan melalui partisipasi masyaratat lokal yang kami sebut sebagai Citizen ichtyologist yang tertarik dengan ikan air tawar dan memiliki pengetahuan atau pengalaman dalam bidang tersebut. Citizen ichthyologist, atau pencinta ikan yang bukan merupakan ahli ilmu ikan profesional, berperan penting dalam mengumpulkan data ini. Mereka dapat memberikan kontribusi dengan mengidentifikasi spesies ikan, mengumpulkan informasi mengenai lokasi penemuan ikan, serta membagikan pengalaman dan pengetahuan mereka dengan komunitas.</h5>
                    <h5 className="mt-3 mb-0 fw-normal">Melalui kerjasama antara anggota komunitas, data yang terkumpul dapat digunakan untuk memperkaya pengetahuan tentang keanekaragaman ikan air tawar di Indonesia. Informasi ini dapat digunakan dalam upaya pelestarian dan pengelolaan sumber daya ikan, serta untuk mempromosikan kekayaan dan keindahanan ikan native Indonesia kepada masyarakat luas.</h5>
                    <h5 className="mt-3 mb-0 fw-normal">Komunitas "Freshwater Fish of Indonesia" memiliki peran penting dalam melestarikan dan mengenalkan ikan asli Indonesia. Dengan meningkatkan kesadaran dan pengetahuan tentang keanekaragaman ikan air tawar di Indonesia, diharapkan orang Indonesia akan semakin menghargai dan melindungi warisan alam yang berharga ini.</h5>
                </div>
            </Template>
        );
    }
}

export default About;
