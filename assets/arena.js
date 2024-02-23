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
		let linkItem =
			`
			<li class="block block--link">
				<figcaption>${block.title}</figcaption>

				<div class="block--link__description">
					<section class="description-header">
							<div class="class-onclick">${block.class}</div>
							<button class="close-button">X</button>
					</section>
					<section class="description-body">
						<section class="link-onclick">
							<source media="(max-width: 640px)" srcset="${block.image.large.url}">
							<img src="${block.image.large.url} alt="${block.title}" by "${block.user.fullname}" width="300" height="300">
						</section>
						<section class="description-onclick">
							<div class="title-onclick">${block.title}</div>
							<div class="blurb-onclick">${block.description_html}</div>
							<a class="source-onclick" href="${block.source.url}">See the original</a>
						<section>
					</section>
				</div>
			</li>
			`
		channelBlocks.insertAdjacentHTML('beforeend', linkItem)
		console.log(block)
	}


	// Styling for pictures
	// <picture>
	// <source media="(max-width: 428px)" srcset="${ block.image.thumb.url }">
	// <source media="(max-width: 640px)" srcset="${ block.image.large.url }">
	// <img src="${ block.image.original.url }">
	// </picture>
	
	// Images!
	else if (block.class == 'Image') {
        let imageItem =
        `
            <li class="block block--image">
                <figcaption>${block.title}</figcaption>
				
				<div class="block--image__description">
						<section class="images-onclick">
							<source media="(max-width: 640px)" srcset="${ block.image.large.url}">
							<img src="${block.image.large.url}" alt="${block.title}" by "${block.user.fullname}" width="300" height="300">
						</section>
						<section class="description-onclick">
							<section class="description-header">
								<div class="class-onclick">${block.class}</div>
								<button class="close-button">X</button>
							</section>
							<div class="title-onclick">${block.title}</div>
							<div class="blurb-onclick">${block.description_html}</div>
							<a class="source-onclick" href="${block.source}">See the original</a>
						<section>
				</div>
            </li>
        `
        channelBlocks.insertAdjacentHTML('beforeend', imageItem)
	}

	// Styling for pictures
	// <img src="${block.image.large.url}" alt="${block.title}" by "${block.user.fullname}">
	// Description
	// ${block.description_html} 

	// Text!
	else if (block.class == 'Text') {
		let textItem =
        `
            <li class="block block--text">
				<figcaption>${block.title}</figcaption>

				<div class="block--text__description">
					<section class="quote-onclick">
						${block.content_html}
					</section>
					<section class="description-onclick">
						<section class="description-header">
							<div class="class-onclick">${block.class}</div>
							<button class="close-button">X</button>
						</section>
						<div class="quote-title-onclick">${block.title}</div>
						<div class="quote-blurb-onclick">${block.description_html}</div>
						<a class="source-onclick" href="${block.source}">See the original</a>
					</section>
				</div>
            </li>
        `
        channelBlocks.insertAdjacentHTML('beforeend', textItem)
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
            let pdfItem =
            `
                <li class="block block--pdf">
                    <figcaption>${block.title}</figcaption>

					<div class="block--pdf__description">
						<section class="pdf-onclick">
							<a href="${block.attachment.url}">
								<source media="(max-width: 640px)" srcset="${ block.image.large.url }">
								<img src="${block.image.large.url}" alt="${block.title}" by "${block.user.fullname}" width="300" height="300">
							</a>
						</section>
						<section class="description-onclick">
							<section class="description-header">
								<div class="class-onclick">${block.class}</div>
								<button class="close-button">X</button>
							</section>
							<div class="title-onclick">${block.title}</div>
							<div class="blurb-onclick">${block.description_html}</div>
							<a class="source-onclick" href="${block.source}">See the original</a>
						<section>
				</div>
                </li>
            `
        channelBlocks.insertAdjacentHTML('beforeend', pdfItem);
        }

		// Styling for pictures
		// <img src="${block.image.large.url}" alt="${block.title}"></img>

		// Uploaded audio!
		else if (attachment.includes('audio')) {
			// …still up to you, but here’s an `audio` element:
			let audioItem =
				`
				<li class="block block--uploadedaudio">
					<figcaption>${block.generated_title}</figcaption>

					<div class="block--uploadedaudio__description">
						<section class="uploadedaudio-onclick">
							<audio controls src="${block.attachment.url}"></audio> 
						</section>
						<section class="description-onclick">
							<section class="description-header">
								<div class="class-onclick">${block.class}</div>
								<button class="close-button">X</button>
							</section>
							<div class="title-onclick">${block.title}</div>
							<div class="blurb-onclick">${block.description}</div>
							<a class="source-onclick" href="${block.source}">See the original</a>
						</section>
					</div>
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', audioItem)
			// More on audio: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
		}

		// Audio image
		// <audio controls src="${ block.attachment.url }">
		// </audio> 
	}

	// Linked media…
	else if (block.class == 'Media') {
		let embed = block.embed.type

		// Linked video!
		if (embed.includes('video')) {
			// …still up to you, but here’s an example `iframe` element:
			let linkedVideoItem =
				`
				<li class="block block--linkedvideo">
                    <figcaption>${block.generated_title}</figcaption>

					<div class="block--linkedvideo__description">
					<section class="linkedvideo-onclick">
						${block.embed.html}
					</section>
					<section class="description-onclick">
						<section class="description-header">
							<div class="class-onclick">${block.class}</div>
							<button class="close-button">X</button>
						</section>
						<div class="linkedvideo-title-onclick">${block.title}</div>
						<div class="linkedvideo-blurb-onclick">${block.description}</div>
						<a class="source-onclick" href="${block.source}">See the original</a>
					</section>
				</div>
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', linkedVideoItem)
			// More on iframe: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
		}

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

		// // Also display the owner and collaborators:
		// let channelUsers = document.getElementById('channel-users') // Show them together
		// data.collaborators.forEach((collaborator) => renderUser(collaborator, channelUsers))
		// renderUser(data.user, channelUsers)
	})