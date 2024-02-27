// This allows us to process/render the descriptions, which are in Markdown!
// More about Markdown: https://en.wikipedia.org/wiki/Markdown
let markdownIt = document.createElement('script')
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
document.head.appendChild(markdownIt)



// Are.na stuff!
let channelSlug = 'weird-animal-kingdom' // The “slug” is just the end of the URL

// First, let’s lay out some *functions*, starting with our basic metadata:
let placeChannelInfo = (data) => {
	// Target some elements in your HTML:
	let channelTitle = document.getElementById('channel-title')
	console.log (channelTitle)
    let channelDescription = document.getElementById('channel-description')
	let channelCount = document.getElementById('channel-count')
	let channelLink = document.getElementById('channel-link')

	// Then set their content/attributes to our data:
	channelTitle.innerHTML = data.title

    // Why does all the content disappear when the code below isn't hidden?
	// channelDescription.innerHTML = window.markdownit().render(data.metadata.description) // Converts Markdown → HTML
	// channelCount.innerHTML = data.length
	// channelLink.href = `https://www.are.na/channel/${channelSlug}`
}

// Then our big function for specific-block-type rendering:
let renderBlock = (block) => {
	// To start, a shared `ul` where we’ll insert all our blocks
	let channelBlocks = document.getElementById('channel-blocks')

	// Links!
	if (block.class == 'Link') {
		if (block.description_html.length > 0) {
			let linkItem =
			`
			<li class="block block--link">
				<figcaption>${block.title}</figcaption>

				<div class="block--link__description">
					<section class="description-header">
							<div class="class-onclick">${block.class}</div>
							<button class="close-button">X</button>
					</section>
					<section class="link-description-body">
						<section class="link-onclick">
							<section class="image-large">
								<source media="(max-width: 640px)" srcset="${block.image.large.url}">
								<img src="${block.image.large.url}" alt="${block.title}" by "${block.user.fullname}" width="640" height="500">
							</section>
							<section class="image-thumbnail">
								<source media="(max-width: 640px)" srcset="${block.image.thumb.url}">
								<img src="${block.image.thumb.url}" alt="${block.title}" by "${block.user.fullname}" width="100%" height="900px">
							</section>
						</section>
						<section class="link-description-onclick">
							<div class="title-onclick">${block.title}</div>
							<div class="blurb-onclick">${block.description_html}</div>
							<a class="link-source-onclick" href=${block.source_url}>See the original</a>
						</section>
					</section>
				</div>
			</li>
			`
		channelBlocks.insertAdjacentHTML('beforeend', linkItem)
		} else {
			let linkItem =
			`
			<li class="block block--link">
				<figcaption>${block.title}</figcaption>

				<div class="block--link__description">
					<section class="description-header">
							<div class="class-onclick">${block.class}</div>
							<button class="close-button">X</button>
					</section>
					<section class="link-description-body">
						<section class="link-onclick">
							<section class="image-large">
								<source media="(max-width: 640px)" srcset="${block.image.large.url}">
								<img src="${block.image.large.url}" alt="${block.title}" by "${block.user.fullname}" width="350" height="500">
							</section>
							<section class="image-thumbnail">
								<source media="(max-width: 640px)" srcset="${block.image.thumb.url}">
								<img src="${block.image.thumb.url}" alt="${block.title}" by "${block.user.fullname}" width="200" height="300">
							</section>
						</section>
						<section class="link-description-onclick">
							<div class="title-onclick">${block.title}</div>
							<a class="source-onclick" href=${block.source.url}>See the original</a>
						</section>
					</section>
				</div>
			</li>
			`
		channelBlocks.insertAdjacentHTML('beforeend', linkItem)
		}	
	}
	
	// Images!
	else if (block.class == 'Image') {
		if (block.description_html.length > 0) {
        let imageItem =
        `
            <li class="block block--image">
                <figcaption>${block.title}</figcaption>
				
				<div class="block--image__description">
					<section class="description-header">
						<div class="class-onclick">${block.class}</div>
						<button class="close-button">X</button>
					</section>	
					<section class="images-description-body">
						<section class="images-onclick">
							<section class="image-large">
								<source media="(max-width: 640px)" srcset="${block.image.large.url}">
								<img src="${block.image.large.url}" alt="${block.title}" by "${block.user.fullname}" width="450" height="550">
							</section>
							<section class="image-thumbnail">
								<source media="(max-width: 640px)" srcset="${block.image.thumb.url}">
								<img src="${block.image.thumb.url}" alt="${block.title}" by "${block.user.fullname}" width="100%" height="900px">
							</section>
						</section>
						<section class="images-description-onclick">
							<div class="title-onclick">${block.title}</div>
							<div class="blurb-onclick">${block.description_html}</div>
							<a class="images-source-onclick" href="${block.source}">See the original</a>
						</section>
					</section
				</div>
            </li>
        `
        channelBlocks.insertAdjacentHTML('beforeend', imageItem)
	} else {
		let imageItem =
		`
            <li class="block block--image">
                <figcaption>${block.title}</figcaption>
				
				<div class="block--image__description">
					<section class="description-header">
						<div class="class-onclick">${block.class}</div>
						<button class="close-button">X</button>
					</section>	
					<section class="images-description-body">
						<section class="images-onclick">
							<section class="image-large">
								<source media="(max-width: 640px)" srcset="${block.image.large.url}">
								<img src="${block.image.large.url}" alt="${block.title}" by "${block.user.fullname}" width="350" height="500">
							</section>
							<section class="image-thumbnail">
								<source media="(max-width: 640px)" srcset="${block.image.thumb.url}">
								<img src="${block.image.thumb.url}" alt="${block.title}" by "${block.user.fullname}" width="600" height="700">
							</section>
						</section>
						<section class="images-description-onclick">
							<div class="title-onclick">${block.title}</div>
							<a class="images-source-onclick" href="${block.source}">See the original</a>
						</section>
					</section
				</div>
            </li>
        `
        channelBlocks.insertAdjacentHTML('beforeend', imageItem)
	}
}

	// Text!
	else if (block.class == 'Text') {
		if (block.description_html.length > 0) {
		let textItem =
        `
            <li class="block block--text">
				<figcaption>${block.title}</figcaption>

				<div class="block--text__description">
					<section class="description-header">
						<div class="class-onclick">${block.class}</div>
						<button class="close-button">X</button>
					</section>
					<section class="text-description-body">
						<section class="text-onclick">
							${block.content_html}
						</section>
						<section class="text-description-onclick">
							<div class="title-onclick">${block.title}</div>
							<div class="blurb-onclick">${block.description_html}</div>
							<a class="text-source-onclick" href="${block.source}">See the original</a>
						</section>
					</section>
				</div>
            </li>
        `
        channelBlocks.insertAdjacentHTML('beforeend', textItem)
	} else {
		let textItem =
        `
            <li class="block block--text">
				<figcaption>${block.title}</figcaption>

				<div class="block--text__description">
					<section class="description-header">
						<div class="class-onclick">${block.class}</div>
						<button class="close-button">X</button>
					</section>
					<section class="text-description-body">
						<section class="text-onclick">
							${block.content_html}
						</section>
						<section class="text-description-onclick">
							<div class="title-onclick">${block.title}</div>
							<a class="text-source-onclick" href="${block.source}">See the original</a>
						</section>
					</section>
				</div>
            </li>
        `
        channelBlocks.insertAdjacentHTML('beforeend', textItem)
	}
}

    // Uploaded (not linked) media…
	else if (block.class == 'Attachment') {
		let attachment = block.attachment.content_type // Save us some repetition
    
        // Uploaded videos!
        if (attachment.includes('video')) {
            let videoItem =
                `
                    <li>
                        <p><em>Video</em></p>
                        <video controls src="${block.attachment.url}"></video>
                    </li>
                `
                channelBlocks.insertAdjacentHTML('beforeend', videoItem)
                // More on video, like the `autoplay` attribute:
                // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
        }

        // Uploaded PDFs!
        else if (attachment.includes('pdf')) {
			if (block.description_html && block.description_html.length > 0) {
				let pdfItem =
				`
					<li class="block block--pdf">
						<figcaption>${block.title}</figcaption>
	
						<div class="block--pdf__description">
							<section class="description-header">
								<div class="class-onclick">${block.class}</div>
								<button class="close-button">X</button>
							</section>	
							<section class="pdf-description-body">
								<section class="pdf-onclick">
									<section class="image-large">
										<source media="(max-width: 640px)" srcset="${block.image.large.url}">
										<img src="${block.image.large.url}" alt="${block.title}" by "${block.user.fullname}" width="450" height="500">
									</section>
									<section class="image-thumbnail">
										<source media="(max-width: 640px)" srcset="${block.image.thumb.url}">
										<img src="${block.image.thumb.url}" alt="${block.title}" by "${block.user.fullname}" width="200" height="300">
									</section>
								</section>
								<section class="pdf-description-onclick">
									<div class="title-onclick">${block.title}</div>
									<div class="blurb-onclick">${block.description_html}</div>
									<a class="pdf-source-onclick" href="${block.attachment.url}">See the original</a>
								<section>
							</section>
						</div>
					</li>
				`
				channelBlocks.insertAdjacentHTML('beforeend', pdfItem)
				console.log(pdf)
			} else {
				let pdfItem =
				`
					<li class="block block--pdf">
						<figcaption>${block.title}</figcaption>
	
						<div class="block--pdf__description">
							<section class="description-header">
								<div class="class-onclick">${block.class}</div>
								<button class="close-button">X</button>
							</section>	
							<section class="pdf-description-body">
								<section class="pdf-onclick">
									<section class="image-large">
										<source media="(max-width: 640px)" srcset="${block.image.large.url}">
										<img src="${block.image.large.url}" alt="${block.title}" by "${block.user.fullname}" width="450" height="500">
									</section>
									<section class="image-thumbnail">
										<source media="(max-width: 640px)" srcset="${block.image.thumb.url}">
										<img src="${block.image.thumb.url}" alt="${block.title}" by "${block.user.fullname}" width="200" height="300">
									</section>
								</section>
								<section class="pdf-description-onclick">
									<div class="title-onclick">${block.title}</div>
									<a class="pdf-source-onclick" href="${block.attachment.url}">See the original</a>
								<section>
							</section>
						</div>
					</li>
				`
				channelBlocks.insertAdjacentHTML('beforeend', pdfItem)
			}
   	}

		// Styling for pictures
		// <img src="${block.image.large.url}" alt="${block.title}"></img>

		// Uploaded audio!
		else if (attachment.includes('audio')) {
			if (block.description_html && block.description_html.length > 0) {
				let audioItem =
					`
					<li class="block block--uploadedaudio">
						<figcaption>${block.generated_title}</figcaption>
		
						<div class="block--uploadedaudio__description">
							<section class="description-header">
								<div class="class-onclick">${block.class}</div>
								<button class="close-button">X</button>
							</section>
							<section class="audio-description-body">
								<section class="uploadedaudio-onclick">
									<audio controls src="${block.attachment.url}"></audio> 
								</section>
								<section class="audio-description-onclick">
									<div class="title-onclick">${block.title}</div>
									<div class="blurb-onclick">${block.description}</div>
									${block.source ? `<a class="audio-source-onclick" href="${block.source}">See the original</a>` : ''}
								</section>
							</section>
						</div>
					</li>
					`
				channelBlocks.insertAdjacentHTML('beforeend', audioItem)
			} else {
				let audioItem =
					`
					<li class="block block--uploadedaudio">
						<figcaption>${block.generated_title}</figcaption>
		
						<div class="block--uploadedaudio__description">
							<section class="description-header">
								<div class="class-onclick">${block.class}</div>
								<button class="close-button">X</button>
							</section>
							<section class="audio-description-body">
								<section class="uploadedaudio-onclick">
									<audio controls src="${block.attachment.url}"></audio> 
								</section>
								<section class="audio-description-onclick">
									<div class="title-onclick">${block.title}</div>
									${block.source ? `<a class="audio-source-onclick" href="${block.source}">See the original</a>` : ''}
								</section>
							</section>
						</div>
					</li>
					`
				channelBlocks.insertAdjacentHTML('beforeend', audioItem)
			}
		}
	}

	// ? ... : '': This is the ternary operator syntax. It consists of three parts:
		// The condition (block.source ? ... : ''): This is the part before the ?. If the condition evaluates to true, the expression before the : is executed; otherwise, the expression after the : is executed.
		// ...: This is the expression to execute if the condition is true. In this case, it's the anchor tag for the original source: <a class="source-onclick" href="${block.source}">See the original</a>.
		// '': This is the expression to execute if the condition is false. In this case, it's an empty string ''.
			
	// More on audio: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
	// Audio image
	// <audio controls src="${ block.attachment.url }">
	// </audio> 
	

	// Linked media…
	else if (block.class == 'Media') {
		let embed = block.embed.type

		// Linked video!
		if (embed.includes('video')) {
			if (block.description_html && block.description_html.length > 0) {
			let linkedVideoItem =
				`
				<li class="block block--linkedvideo">
                    <figcaption>${block.generated_title}</figcaption>

					<div class="block--linkedvideo__description">
						<section class="description-header">
							<div class="class-onclick">${block.class}</div>
							<button class="close-button">X</button>
						</section>
						<section class="linkedvideo-description-body">
							<section class="linkedvideo-onclick">
								${block.embed.html}
							</section>
							<section class="linkedvideo-description-onclick">
								<section class="description-text">
									<div class="title-onclick">${block.title}</div>
									<div class="blurb-onclick">${block.description}</div>
								</section>
								<section class="description-source">
									<a class="linkedvideo-source-onclick" href="${block.source.url}">See the original</a>
								</section>
							</section>
						</section>
					</div>
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', linkedVideoItem)
		} else {
			let linkedVideoItem =
				`
				<li class="block block--linkedvideo">
                    <figcaption>${block.generated_title}</figcaption>

					<div class="block--linkedvideo__description">
						<section class="description-header">
							<div class="class-onclick">${block.class}</div>
							<button class="close-button">X</button>
						</section>
						<section class="linkedvideo-description-body">
							<section class="linkedvideo-onclick">
								${block.embed.html}
							</section>
							<section class="linkedvideo-description-onclick">
								<div class="linkedvideo-title-onclick">${block.title}</div>
								<a class="linkedvideo-source-onclick" href="${block.source.url}">See the original</a>
							</section>
						</section>
					</div>
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', linkedVideoItem)
		}
	}
		// More on iframe: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe

		// ${block.embed.html} insert before figcaption element in order to see video image

		// Linked audio!
		else if (embed.includes('rich')) {
			let linkedAudioItem =
			`
				<li class="block block--linkedaudio">
                    <figcaption>${block.generated_title}</figcaption>

					<div class="block--linkedaudio__description">
					<section class="linkedaudio-onclick">
						${block.embed.html}
					</section>
					<section class="description-onclick">
						<section class="description-header">
							<div class="linkedaudio-class-onclick">${block.class}</div>
							<button class="close-button">X</button>
						</section>
						<div class="linkedaudio-title-onclick">${block.title}</div>
						<div class="linkedaudio-blurb-onclick">${block.description}</div>
						<a class="source-onclick" href="${block.source}">See the original</a>
					</section>
				</div>
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', linkedAudioItem)
		}
	}
}


// Now that we have said what we can do, go get the data:
fetch(`https://api.are.na/v2/channels/${channelSlug}?per=100`, { cache: 'no-store' })
	.then((response) => response.json()) // Return it as JSON data
	.then((data) => { // Do stuff wit h the data
		console.log(data) // Always good to check your response!        
        placeChannelInfo(data) // Pass the data to the first function

		// Loop through the `contents` array (list), backwards. Are.na returns them in reverse!
		data.contents.reverse().forEach((block) => {
			console.log(block) // The data for a single block
			renderBlock(block) // Pass the single block data to the render function
		 })

		// Styling figcaption for onClick
		let openButtons = document.querySelectorAll('.block figcaption')
		openButtons.forEach((openButton) => {
			openButton.onclick = () => {
				let parentBlock = openButton.parentElement
				parentBlock.classList.toggle('active')
			}
		})

		// Styling close button
		let closeButtons = document.querySelectorAll('.block .close-button')
		closeButtons.forEach((closeButton) => {
			closeButton.onclick = () => {
				let parentBlock = closeButton.closest('.block')
				parentBlock.classList.toggle('active')
			}
		})

		// AUDIO FILTER 
		// Select the "Audio" button by the button ID defined in HTML
		const audioButton = document.getElementById('audio-button');

		// Click event listener (checks to see if the button is clicked) to the "Audio" button
		audioButton.addEventListener('click', () => {
			// Toggle display of audio blocks
			const blocks = document.querySelectorAll('block');

			blocks.forEach(block => {
				// Toggle the display of the block
				block.classList.toggle('hidden');
			});
		});

		// Track the state of the audio filter
		let audioFilterActive = false;

		// Add click event listener to the "Audio" button
		audioButton.addEventListener('click', () => {
			// Select all blocks
			const blocks = document.querySelectorAll('.block');

    // If the audio filter is active, display all blocks and reset the state
    if (audioFilterActive) {
        blocks.forEach(block => {
            block.style.display = 'block';
        });
        audioFilterActive = false;
    } else {
        // Loop through each block
        blocks.forEach(block => {
            // Check if the block contains an audio attachment
            const isAudioBlock = block.classList.contains('block--uploadedaudio');

            // If the block is an audio block, display it; otherwise, hide it
            block.style.display = isAudioBlock ? '.block--uploadedaudio::marker' : 'none';
        });
        audioFilterActive = true;
    }
});

		// // Also display the owner and collaborators:
		// let channelUsers = document.getElementById('channel-users') // Show them together
		// data.collaborators.forEach((collaborator) => renderUser(collaborator, channelUsers))
		// renderUser(data.user, channelUsers) 
})