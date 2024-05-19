import './Rate.css'
import {useState, useEffect} from 'react'

function Rate({ onRatingChange} ) {
	const [rating, setRating] = useState(0);

    const handleRatingChange = (event) => {
        const newRating = parseInt(event.target.value);
        setRating(newRating);
        onRatingChange(newRating); // Call the callback function with the new rating
    };

    useEffect(() => {
        console.log(rating); // This will log the updated rating whenever it changes
    }, [rating]); // Run this effect whenever the rating state changes

    return(
        <div class="RateRoot RateContainer">
<form class="rating">
		<div class="rating__stars">
			<input id="rating-1" class="rating__input rating__input-1" type="radio" name="rating" value="1" onChange={handleRatingChange}/>
			<input id="rating-2" class="rating__input rating__input-2" type="radio" name="rating" value="2" onChange={handleRatingChange}/>
			<input id="rating-3" class="rating__input rating__input-3" type="radio" name="rating" value="3" onChange={handleRatingChange}/>
			<input id="rating-4" class="rating__input rating__input-4" type="radio" name="rating" value="4" onChange={handleRatingChange}/>
			<input id="rating-5" class="rating__input rating__input-5" type="radio" name="rating" value="5" onChange={handleRatingChange}/>
			<label class="rating__label" for="rating-1">
				<svg class="rating__star" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
					<g transform="translate(16,16)">
						<circle class="rating__star-ring" fill="none" stroke="#000" stroke-width="16" r="8" transform="scale(0)" />
					</g>
					<g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<g transform="translate(16,16) rotate(180)">
							<polygon class="rating__star-stroke" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="none" />
							<polygon class="rating__star-fill" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="#000" />
						</g>
						<g transform="translate(16,16)" stroke-dasharray="12 12" stroke-dashoffset="12">
							<polyline class="rating__star-line" transform="rotate(0)" points="0 4,0 16" />
							<polyline class="rating__star-line" transform="rotate(72)" points="0 4,0 16" />
							<polyline class="rating__star-line" transform="rotate(144)" points="0 4,0 16" />
							<polyline class="rating__star-line" transform="rotate(216)" points="0 4,0 16" />
							<polyline class="rating__star-line" transform="rotate(288)" points="0 4,0 16" />
						</g>
					</g>
				</svg>
				<span class="rating__sr">1 star—Berbat</span>
			</label>
			<label class="rating__label" for="rating-2">
				<svg class="rating__star" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
					<g transform="translate(16,16)">
						<circle class="rating__star-ring" fill="none" stroke="#000" stroke-width="16" r="8" transform="scale(0)" />
					</g>
					<g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<g transform="translate(16,16) rotate(180)">
							<polygon class="rating__star-stroke" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="none" />
							<polygon class="rating__star-fill" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="#000" />
						</g>
						<g transform="translate(16,16)" stroke-dasharray="12 12" stroke-dashoffset="12">
							<polyline class="rating__star-line" transform="rotate(0)" points="0 4,0 16" />
							<polyline class="rating__star-line" transform="rotate(72)" points="0 4,0 16" />
							<polyline class="rating__star-line" transform="rotate(144)" points="0 4,0 16" />
							<polyline class="rating__star-line" transform="rotate(216)" points="0 4,0 16" />
							<polyline class="rating__star-line" transform="rotate(288)" points="0 4,0 16" />
						</g>
					</g>
				</svg>
				<span class="rating__sr">2 stars—Kötü</span>
			</label>
			<label class="rating__label" for="rating-3">
				<svg class="rating__star" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
					<g transform="translate(16,16)">
						<circle class="rating__star-ring" fill="none" stroke="#000" stroke-width="16" r="8" transform="scale(0)" />
					</g>
					<g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<g transform="translate(16,16) rotate(180)">
							<polygon class="rating__star-stroke" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="none" />
							<polygon class="rating__star-fill" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="#000" />
						</g>
						<g transform="translate(16,16)" stroke-dasharray="12 12" stroke-dashoffset="12">
							<polyline class="rating__star-line" transform="rotate(0)" points="0 4,0 16" />
							<polyline class="rating__star-line" transform="rotate(72)" points="0 4,0 16" />
							<polyline class="rating__star-line" transform="rotate(144)" points="0 4,0 16" />
							<polyline class="rating__star-line" transform="rotate(216)" points="0 4,0 16" />
							<polyline class="rating__star-line" transform="rotate(288)" points="0 4,0 16" />
						</g>
					</g>
				</svg>
				<span class="rating__sr">3 stars—Fena Değil</span>
			</label>
			<label class="rating__label" for="rating-4">
				<svg class="rating__star" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
					<g transform="translate(16,16)">
						<circle class="rating__star-ring" fill="none" stroke="#000" stroke-width="16" r="8" transform="scale(0)" />
					</g>
					<g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<g transform="translate(16,16) rotate(180)">
							<polygon class="rating__star-stroke" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="none" />
							<polygon class="rating__star-fill" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="#000" />
						</g>
						<g transform="translate(16,16)" stroke-dasharray="12 12" stroke-dashoffset="12">
							<polyline class="rating__star-line" transform="rotate(0)" points="0 4,0 16" />
							<polyline class="rating__star-line" transform="rotate(72)" points="0 4,0 16" />
							<polyline class="rating__star-line" transform="rotate(144)" points="0 4,0 16" />
							<polyline class="rating__star-line" transform="rotate(216)" points="0 4,0 16" />
							<polyline class="rating__star-line" transform="rotate(288)" points="0 4,0 16" />
						</g>
					</g>
				</svg>
				<span class="rating__sr">4 stars—İyi</span>
			</label>
			<label class="rating__label" for="rating-5">
				<svg class="rating__star" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
					<g transform="translate(16,16)">
						<circle class="rating__star-ring" fill="none" stroke="#000" stroke-width="16" r="8" transform="scale(0)" />
					</g>
					<g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<g transform="translate(16,16) rotate(180)">
							<polygon class="rating__star-stroke" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="none" />
							<polygon class="rating__star-fill" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="#000" />
						</g>
						<g transform="translate(16,16)" stroke-dasharray="12 12" stroke-dashoffset="12">
							<polyline class="rating__star-line" transform="rotate(0)" points="0 4,0 16" />
							<polyline class="rating__star-line" transform="rotate(72)" points="0 4,0 16" />
							<polyline class="rating__star-line" transform="rotate(144)" points="0 4,0 16" />
							<polyline class="rating__star-line" transform="rotate(216)" points="0 4,0 16" />
							<polyline class="rating__star-line" transform="rotate(288)" points="0 4,0 16" />
						</g>
					</g>
				</svg>
				<span class="rating__sr">5 stars—MUHTEŞEM</span>
			</label>
			<p class="rating__display" data-rating="1" hidden>Berbat</p>
			<p class="rating__display" data-rating="2" hidden>Kötü</p>
			<p class="rating__display" data-rating="3" hidden>Fena Değil</p>
			<p class="rating__display" data-rating="4" hidden>İyi</p>
			<p class="rating__display" data-rating="5" hidden>MUHTEŞEM</p>
		</div>
	</form>
        </div>
    );
}

export default Rate;