import React from 'react';
import './Home.scss';
import heroSvg from '../../Assets/Images/team-chat2.svg';
import mobileSvg from '../../Assets/Images/mobile-friendly.svg';
import realTimeUpdateSvg from '../../Assets/Images/real-time-updates.svg';
import filesUploadSvg from '../../Assets/Images/upload-files.svg';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function Home() {
	const user = useSelector((state) => state.userReducer);
	return (
		<motion.div initial={{ y: '-50vh' }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: 'easeInOut' }}>
			<div className='home-page '>
				<nav className='nav-links flex space-between align-center '>
					<section className='logo'>Parrot</section>
					<ul className='clean-list flex align-center'>
						<li>About</li>
						<li>Contact</li>
						{user.isAuth ? (
							<Link to='/'>
								<li>Workspace</li>
							</Link>
						) : (
							<Link to='login'>
								<li>Login</li>
							</Link>
						)}
					</ul>
				</nav>
				<div className='hero'>
					<section className='hero-txt'>
						<h3>Connecting To People</h3>
						<h5>Collaborate with your friends </h5>
						<p>
							Parrot brings your team to one place, where you can chat, <br />
							get updated and share your thoughts.
						</p>
						<section className='hero-actions'>
							<Link to='signup'>
								<button className='btn-start'>Get Started</button>
							</Link>
							<Link to='login'>
								<button className='btn-member'>Already a member</button>
							</Link>
						</section>
					</section>
					<img src={heroSvg} alt='hero' />
				</div>
				<div className='parrot-info-cards flex col'>
					<section className='card'>
						<img src={realTimeUpdateSvg} alt='' />
						<p>
							<span>Responsive Design</span>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius cupiditate ipsum eos delectus qui
							praesentium voluptatem id in, consequatur veritatis.
						</p>
					</section>
					<section className='card'>
						<img src={mobileSvg} alt='' />
						<p>
							<span>Real Time Updates</span>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius cupiditate ipsum eos delectus qui
							praesentium voluptatem id in, consequatur veritatis.
						</p>
					</section>
					<section className='card'>
						<img src={filesUploadSvg} alt='' />
						<p>
							<span>Share Your Files</span>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius cupiditate ipsum eos delectus qui
							praesentium voluptatem id in, consequatur veritatis.
						</p>
					</section>
				</div>
				<div className='contact-us-wrapper'>
					<div className='contact-us'>
						<h1>Tell us what you think</h1>
						<input type='text' placeholder='Your email' />
						<textarea placeholder='Your Thoughts...' cols='30' rows='10' />
						<button>Send</button>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
