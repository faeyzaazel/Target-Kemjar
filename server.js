const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

// Penyimpanan akun di memori (termasuk akun default untuk testing cepat)
const users = [
  { username: 'admin', password: 'password123' }
];

// Data mahasiswa Departemen Teknik Elektro (Parsed dari data tabel)
const rawStudentsData = `
Abidatul Aulia	2406360281	Teknik Biomedik
Adara Tafia Putri Nugroho	2406438460	Teknik Biomedik
Alexia Talitha Cymbeline Purba	2406487563	Teknik Biomedik
Amira Raisa Khayrani	2406487481	Teknik Biomedik
Andita Widyadhana Veasna Mahdi	2406439690	Teknik Biomedik
Angel Clariza Kohar	2406359121	Teknik Biomedik
Annabell Della Sumantri	2406415040	Teknik Biomedik
Diva Soraya Khairunnisa	2406432715	Teknik Biomedik
Dwidra Audric Farras	2406426265	Teknik Biomedik
Fildzah Khariza Burhani	2406357753	Teknik Biomedik
Ghailan Alfath Ulwanqobus	2406487595	Teknik Biomedik
Grace Ananda Josephine	2406487544	Teknik Biomedik
Gracia Angela Yohan	2406352790	Teknik Biomedik
Habibah Dzikriyanti	2406400902	Teknik Biomedik
Hanifah Yumna Nabilah	2406405960	Teknik Biomedik
Joyceline Salim	2406487494	Teknik Biomedik
Kaila Ahda Sabila	2406350040	Teknik Biomedik
Kayla N Yusuf	2406487443	Teknik Biomedik
Keira Khairani Haqi	2406419562	Teknik Biomedik
Kezia Maria Agatha	2406487550	Teknik Biomedik
Khaeta Kayla Darmawan	2406343161	Teknik Biomedik
Khansa Calista Hendratna	2406487424	Teknik Biomedik
Laurence Sheila Artha Silitonga	2406402025	Teknik Biomedik
Marizka Zuhra Maahira Nathin	2406487525	Teknik Biomedik
Muhammad Fathurrahman Dzikri Adinata	2406415646	Teknik Biomedik
Muhammad Khayru Rashad Hidayat	2406357596	Teknik Biomedik
Muhammad Syamil Abiy Syathir	2406428296	Teknik Biomedik
Nadine Aisyah Wiyono	2406438441	Teknik Biomedik
najla reisi syamila	2406353692	Teknik Biomedik
Nazlah Razita	2406404522	Teknik Biomedik
Raisha Rania Lestari	2406487506	Teknik Biomedik
Rifaa Mahira Azzahra	2406430514	Teknik Biomedik
Rosha Febri Mahsera	2406354562	Teknik Biomedik
Syahirah Nadiya Adila	2406487600	Teknik Biomedik
Syifa Rahima	2406351333	Teknik Biomedik
Zafira Anindita	2406405286	Teknik Biomedik
Zulfani Jahra Nabila	2406402164	Teknik Biomedik
Naufal Farras	2406439034	Teknik Biomedik
Abdul Jafor Magandhi Sumby	2406400713	Teknik Elektro
Adhinata Mohammad Yudho Negoro	2406485614	Teknik Elektro
Adriel Fazl Fardian	2406400436	Teknik Elektro
AGNES OKTAVIANI SILABAN	2406485835	Teknik Elektro
Agus Rianto	2406346024	Teknik Elektro
Ahmad Firdaus	2406401180	Teknik Elektro
Ahmad Ghufran	2406396483	Teknik Elektro
Ahmad Zulfan Ali Sabara	2406434475	Teknik Elektro
Alessandro Moses Darmawangsa Simanjuntak	2406350545	Teknik Elektro
Alfina Himmatus Tsuroya	2406357160	Teknik Elektro
Ali Rizki Adya Pratama	2406422260	Teknik Elektro
Alief Rizki Faturrahman	2406345072	Teknik Elektro
Alina Ransi Jamiputri	2406485772	Teknik Elektro
Altaf Farzana	2406355754	Teknik Elektro
Althamis Dhiaurrahman Ma'ani	2406414334	Teknik Elektro
Andrew Kurniawan Halim	2406401981	Teknik Elektro
Aqiilah safaraz pambudi	2406431422	Teknik Elektro
Arsha Permana Haryoko	2406485652	Teknik Elektro
Aslam Dani	2406344725	Teknik Elektro
Azra Farisi Muhammad	2406429840	Teknik Elektro
bintang adi wibowo	2406348742	Teknik Elektro
Charlie Wijaya	2406485740	Teknik Elektro
Chiara Naura Syifa	2406485892	Teknik Elektro
Dame Jerikho Hizkia Rachamim Manurung	2406406074	Teknik Elektro
Danish Fikri Sunjayadi	2406399333	Teknik Elektro
Darrel Muhammad Rauhillah Garna	2406413035	Teknik Elektro
Dimas Ahmad Dhiyaurrahman	2406485841	Teknik Elektro
Dominick Dexter Gunawan	2406413514	Teknik Elektro
Elias Rechoum	2406354045	Teknik Elektro
Erland Farrel Hollyan	2406361321	Teknik Elektro
Evhandri	2406361151	Teknik Elektro
Farras Muzhaffar	2406398160	Teknik Elektro
Farras Naufal Nankyehan	2406414151	Teknik Elektro
Farras Raihan Suwono	2406432665	Teknik Elektro
Farrel Faraidh Khaizan	2406485690	Teknik Elektro
Farrell Athallah dzaky	2406404434	Teknik Elektro
Fatih Fadhlul Azis	2406411673	Teknik Elektro
Geraldo Radithio Putra Mediarman	2406400644	Teknik Elektro
Gerhard Haryanto Purba	2406353553	Teknik Elektro
Gibran Fayzati	2406425483	Teknik Elektro
Godwin Filbert Parsaulian Simatupang	2406425306	Teknik Elektro
Gusti M. Allydza De Averoose	2406426164	Teknik Elektro
Hafidz Dwi Febrian	2406355905	Teknik Elektro
Hanzholah Rantisi	2406485715	Teknik Elektro
Hasan Abdullah Azzam	2406428314	Teknik Elektro
Huzahra Azkiya Kardi	2406485766	Teknik Elektro
Iftikharus Raudana Muntazar	2406416333	Teknik Elektro
Ilham Muqfi	2406401041	Teknik Elektro
Irsyad Ismail Dwi Putra	2406357791	Teknik Elektro
Izami Eurico Bermanah	2406397340	Teknik Elektro
Jerry Linson	2406419631	Teknik Elektro
Jonathan Alexander Panggabean	2406420652	Teknik Elektro
Kanz Ghaits Daffa	2406412726	Teknik Elektro
Kayla Kusumawardhani	2406409473	Teknik Elektro
Kemas Muhammad Risyad Alizain	2406351081	Teknik Elektro
Kenzi Akmal Subagja	2406346485	Teknik Elektro
Kevin Samuel Adhipradana Sibarani	2406421163	Teknik Elektro
Kevin Yehezkiel Simanungkalit	2406402435	Teknik Elektro
Keysha Fiolin	2406348414	Teknik Elektro
Kieshan Abdallah Wibowo	2406411175	Teknik Elektro
Leonard Bagaskara Cahyo Widodo	2406403835	Teknik Elektro
Luqman Fathin	2406358554	Teknik Elektro
Manuel Christian Jesse Pasaribu	2406342530	Teknik Elektro
Mohamad Andra Julian	2406342612	Teknik Elektro
Monang P. Nababan	2406395700	Teknik Elektro
Muhamad Adjie Hidayatullah	2406360754	Teknik Elektro
Muhamad Hapip	2406345236	Teknik Elektro
Muhamad Rangga Aldiyan Pasha	2406396962	Teknik Elektro
Muhammad Afrizal Syarif	2406485620	Teknik Elektro
Muhammad Akbar Malik Satria	2406485873	Teknik Elektro
Muhammad Alif Haditsa	2406348673	Teknik Elektro
Muhammad Athar Rasendriya	2406362135	Teknik Elektro
Muhammad Danish Figo Firdauzi	2406429696	Teknik Elektro
Muhammad Farhat Wibowo	2406429544	Teknik Elektro
Muhammad Farid Akbar	2406410891	Teknik Elektro
Muhammad Fatih Zamzami	2406404075	Teknik Elektro
Muhammad Ghazy Ar'Rafi	2406397813	Teknik Elektro
Muhammad Hafizh Abrar	2406398242	Teknik Elektro
muhammad hanif azzahir	2406344460	Teknik Elektro
Muhammad Ichwan Kamil	24063433495	Teknik Elektro
Muhammad ikhsan	2406357816	Teknik Elektro
Muhammad Isyraq Faachir	2406348692	Teknik Elektro
Muhammad Nafis Yusa’	2406428301	Teknik Elektro
Muhammad Rafif Khairullah	2406400680	Teknik Elektro
Muhammad Razan Arkaan Afriansyah	2406485854	Teknik Elektro
Muhammad Rizky	2406485721	Teknik Elektro
MUHAMMAD THARIQ ADZ-DZIKRA	2406360786	Teknik Elektro
Nabil Haniya Zafri	2406408786	Teknik Elektro
Nadhif Ramadhiansyah	2406436070	Teknik Elektro
Naila Faiza	2406400354	Teknik Elektro
Narda Ikiru Vaisnawa	2406420261	Teknik Elektro
Naufal Eza Pradana	2406360590	Teknik Elektro
Naura Ceylo Sikarini Suwarda	2406485734	Teknik Elektro
Nur Azizah	2406352241	Teknik Elektro
Pramudya Efraim Silitonga	2406395423	Teknik Elektro
Raffa Iqbal Althafsyah	2406438366	Teknik Elektro
Rafi Arya Putra	2406485671	Teknik Elektro
Rajendra Adhika Pradhana	2406405973	Teknik Elektro
Rakkhita Astwa Juanda	2406412442	Teknik Elektro
Rama Fawwaz Putra Sucipto	2406402044	Teknik Elektro
Rangga Hiero Prananda	2406416535	Teknik Elektro
Rania Aziza Noer	2406397605	Teknik Elektro
Rasyid Andaru Putra	2406351176	Teknik Elektro
Raynor Yudha Akbar	2406422512	Teknik Elektro
Regina Olivia Siregar	2406426681	Teknik Elektro
Rivalezka Noer Nabila	2406357835	Teknik Elektro
Riyan Adit Khaerudin	2406485803	Teknik Elektro
Rizqi Muhammad Rayana	2406362085	Teknik Elektro
Romulo Ekoputra Suharto	2406422683	Teknik Elektro
Ruby Umar Gading	2406397965	Teknik Elektro
Ruby Yudhistira	2406361290	Teknik Elektro
Sachio Adhya Syafala Pradana	2406406534	Teknik Elektro
Subhan Farizki	2406417424	Teknik Elektro
Surya Darma Bakti	2406408464	Teknik Elektro
Taura Zaidan Nur Prasetyo	2406403066	Teknik Elektro
Vito Madani Winata	2406425634	Teknik Elektro
Waffa Najmyl Hadzqi Fairuzi	2406485702	Teknik Elektro
Yolanda Vionida	2406344290	Teknik Elektro
Yu Kai Lun	2406411660	Teknik Elektro
Zaid Abdur Razak Satriawan	2406419026	Teknik Elektro
Annisa Ramadani	2406344164	Teknik Elektro
Yazid Rifqi Pratama	2406345293	Teknik Elektro
Azwa Syafira Dayana Nasution	2406439514	Teknik Elektro
Muhammad Rasyad Indra Putra	2406358491	Teknik Elektro
Salma Nadira Riztisa	2406342493	Teknik Elektro
Triadi Ilyasa Sukmaputra	2406411950	Teknik Elektro
Abram Adrian Wilman Simanjuntak	2406439375	Teknik Komputer
Ade Zaskia Azzahra	2406344353	Teknik Komputer
Ahmad Malik Prasetyo	2406416270	Teknik Komputer
Aidan Ardhazizi	2406430483	Teknik Komputer
Akbar Anvasa Faraby	2406405361	Teknik Komputer
Alwahib Raffi Raihan	2406397630	Teknik Komputer
Arkaan Pasya Seplitara	2406408073	Teknik Komputer
Arya Wibawa Atmanegara	2406420431	Teknik Komputer
Ayesha Zelene Faeyza	2406359166	Teknik Komputer
Carlsson Khovis	2406347853	Teknik Komputer
Clementheo Benaya Raya Silitonga	2406413810	Teknik Komputer
DANISH AL FAYYADH SUNARTA	2406416951	Teknik Komputer
Danish Putra Devananda	2406354202	Teknik Komputer
David Alexander	2406351592	Teknik Komputer
Diandra Pramesti Wicaksono	2406342360	Teknik Komputer
Dimar Ilham Tamara	2406413804	Teknik Komputer
Djukallita Tafiana Djoewarsa	2406416573	Teknik Komputer
Fahmi Milan Amyar	2406360060	Teknik Komputer
Fahreza Dwi Cahyo Purnomo	2406426965	Teknik Komputer
Fauzan Arfa Nofiantoro	2406411793	Teknik Komputer
Fernanda Raeka Yan Putra	2406415791	Teknik Komputer
Haidar Rafif Radithya	2406408836	Teknik Komputer
Haikal Gifari Inzaghi	2406432261	Teknik Komputer
Irgy Rabbani Sakti	2406438290	Teknik Komputer
Jesaya Hamonangan Gaudensius Malau	2406409845	Teknik Komputer
Jonathan Christopher	2406349423	Teknik Komputer
Joshua Richardo Riangkamang	2406361946	Teknik Komputer
Kamila Salma Fathiyya	2406487071	Teknik Komputer
Kayla Joanna Irsy Kusumah	2406487014	Teknik Komputer
khalisa zahra maulana	2406425395	Teknik Komputer
Marshal Aufa Diliyana	2406346913	Teknik Komputer
Michael Christian	2406348944	Teknik Komputer
Mohamad Rizky Alamsyah	2406420892	Teknik Komputer
Muhamad Rifqi Fadil Itsnain	2406355306	Teknik Komputer
Muhammad Daffa Rizki	2406402050	Teknik Komputer
Muhammad Dhiya'ulhaq	2406356782	Teknik Komputer
Muhammad Hashif Jade	2406396786	Teknik Komputer
Muhammad Rasya Syahputra	2406357803	Teknik Komputer
Muhammad Zaki Al Khairi	2406432375	Teknik Komputer
Nabil Putra Nurfariz	2406416024	Teknik Komputer
Nadia Izzati	2406487033	Teknik Komputer
Naufal Rahman	2406413142	Teknik Komputer
Naziehan Labieb	2406487102	Teknik Komputer
Nicholas Edmund Tanaka	2406352986	Teknik Komputer
Nirmala Sari Zahiroh	2406425653	Teknik Komputer
Novan Agung Wicaksono	2406401294	Teknik Komputer
Novatama Eka Fitria	2406346466	Teknik Komputer
Otniel Kristian Sianturi	2406401571	Teknik Komputer
Pasha Ahmad Shidqi Pratama	2406412650	Teknik Komputer
Putri Ayu Pembayun M	2406422304	Teknik Komputer
Putu Arkana Satriakusuma	2406486983	Teknik Komputer
Radya Gardian Pranoto	2406404592	Teknik Komputer
Raihan Muhammad Nafis Al-Kautsar	2406413451	Teknik Komputer
Raja Avicenna Al-Kindi Vijasa	2406416352	Teknik Komputer
Rana Aqila Karim	2406406194	Teknik Komputer
Reinathan Ezkhiel Kurniawan	2406397675	Teknik Komputer
Reyhan Batara	2406348950	Teknik Komputer
Sabbia Meilandri Putri Delarosya	2406351131	Teknik Komputer
Sakabudi Muhammad	2406429683	Teknik Komputer
Satrio Atalla Rahardjo	2406413666	Teknik Komputer
Steven	2406359600	Teknik Komputer
Syifa Naila Maulidya	2406436940	Teknik Komputer
Tomas Warren Wuisang	2406423963	Teknik Komputer
Toriq Fathoni Dezi	2406487115	Teknik Komputer
Tubagus Dafa Izza Fariz	2406350122	Teknik Komputer
Valiant Joshua	2406352153	Teknik Komputer
Vincenzo Fabian Tisila	2406354215	Teknik Komputer
Yusri Sukur	2406345305	Teknik Komputer
Zahir	2406487084	Teknik Komputer
Zhafarrel Alvarezqi Pradsandhanna Kadarusman	2406404945	Teknik Komputer
Zulfahmi Fajri	2406345425	Teknik Komputer
Thalita Salma	2406419354	Teknik Komputer
Safina Amarani	2406415665	Teknik Komputer
Perry Tjahya	2406409965	Teknik Komputer
Mohammad Ariq Haqi	2406431271	Teknik Komputer
Qais Ismail	2406487090	Teknik Komputer
Ferdyano	2406353723	Teknik Komputer
Eugenia Huwaida Imtinan	2406421384	Teknik Komputer
`;

const students = rawStudentsData
  .trim()
  .split('\n')
  .map((line) => {
    const [name, npm, major] = line.split('\t').map((item) => item.trim());
    return { npm, name, major };
  });

// Route awal langsung arahkan ke /login dengan parameter ?next=/search
app.get('/', (req, res) => {
  res.redirect('/login?next=/search');
});

// =========================================================================
// HALAMAN 1A: LOGIN (CELAH OPEN REDIRECT)
// =========================================================================
app.get('/login', (req, res) => {
  const nextUrl = req.query.next || '/search';
  res.render('login', { nextUrl, error: null });
});

app.post('/login', (req, res) => {
  const { username, password, next } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    // [VULNERABILITY: OPEN REDIRECT]
    // Server langsung me-redirect ke nilai 'next' tanpa validasi domain tujuan
    return res.redirect(next || '/search');
  }

  res.status(401).render('login', {
    nextUrl: next || '/search',
    error: 'Username or Password Not Found!'
});
});

// =========================================================================
// HALAMAN 1B: SIGN UP
// =========================================================================
app.get('/signup', (req, res) => {
  res.render('signup', { error: null, success: null });
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  const exists = users.some((u) => u.username === username);

  if (exists) {
    return res.render('signup', {
      error: 'Username Already Exists!',
      success: null
    });
  }

  users.push({ username, password });

  // Kirim pesan ke variabel success untuk memicu popup browser di signup.ejs
  res.render('signup', {
    error: null,
    success: `Akun "${username}" berhasil didaftarkan! Klik OK untuk ke halaman Login, atau Cancel untuk tetap di sini.`
  });
});

// =========================================================================
// HALAMAN 2: SEARCH MAHASISWA (CELAH DOS / REDOS + NO RATE LIMIT)
// =========================================================================
app.get('/search', (req, res) => {
  const q = req.query.q ? req.query.q.trim() : '';
  let results = [];

  if (q) {
    // 1. Jalankan filter pencarian normal terlebih dahulu agar responsif bagi user biasa
    results = students.filter(
      (s) =>
        s.name.toLowerCase().includes(q.toLowerCase()) ||
        s.npm.includes(q)
    );

    // 2. [VULNERABILITY: ReDoS]
    // Pola ini tetap cepat untuk teks huruf biasa yang cocok,
    // tapi akan langsung freeze (Catastrophic Backtracking) jika penyerang 
    // memasukkan string panjang + karakter simbol di akhir (misal: "aaaaaaaaaaaaaaaaaaaaaaaaa!")
    const vulnerableRegex = /^([a-zA-Z0-9\s]+)+$/;
    vulnerableRegex.test(q);
  }

  res.render('search', { q, results });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[+] Server ELBASE berjalan di http://0.0.0.0:${PORT}`);
  console.log(`[+] Total data mahasiswa dimuat: ${students.length} mahasiswa`);
});