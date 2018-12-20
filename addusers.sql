--
-- Database: `samplevideo_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE IF NOT EXISTS `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  'email' varchar(100) DEFAULT NULL,
  'phone' varchar(15) DEFAULT NULL,
  'title' varchar(50) DEFAULT NULL,
  'admin' boolean DEFAULT 'false',
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10001 ;

--
-- Dumping data for table `user_details`
--

INSERT INTO contacts (first_name, last_name, email, phone, title, admin) VALUES ('drew', 'nelson', 'drew.nelson@prismsystems.com', '(205) 908-8720', 'system designs group', true)
