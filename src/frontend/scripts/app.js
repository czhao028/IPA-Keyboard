// ------------------------------------------------
// ------------------------------------------------
// Utils
function get_key(e) {
	var keynum;
		keynum = (window.event)
			? e.keyCode
			: ( (e.which) ? e.which : keynum );
	return String.fromCharCode(keynum);
}
function get_style(el,style_prop) {
	var o = null;
	if (el.currentStyle) {
		o = el.currentStyle[style_prop];
	} else if (window.getComputedStyle) {
		o = document.defaultView.getComputedStyle(el,null).getPropertyValue(style_prop);
	}
	return o;
}

const defaultIPAExtendedMapping = {'a': ['a', 'aʰ', 'aʲ', 'aʲː', 'aˀ', 'aː', 'ã', 'ãʲ', 'ãː', 'a̰', 'ã̰', 'æ', 'æː', 'æ̃', 'æ̃ː', 'ɐ', 'ɐ̃', 'ɑ', 'ɑː', 'ɑ̃', 'ɑ̰', 'ɒ', 'ɒː', 'ɒ̃', 'ɒ̃ː', 'ɔ', 'ɶ', 'ʌ'], 'b': ['b', 'bz', 'bʰ', 'bʲ', 'bʷ', 'bː', 'b̰', 'bβ', 'ɓ', 'ɓ̥', 'ʔb', 'ʙ', 'ʰb', 'β', 'βʲ', 'β̞'], 'c': ['c', 'cçʰ', 'cç', 'cʰ', 'cʼ', 'c̰', 'tɕ', 'ç', 'ƈ', 'ɕ', 'ʰc'], 'd': ['d', 'dz', 'dʒ', 'dʰ', 'dʲ', 'dː', 'd̪', 'd̪ʰ', 'd̰', 'ð', 'ð̞', 'ɖ', 'ɖʐ', 'ɗ', 'ɗ̥', 'ʔd', 'ʔdʒ', 'ʠ', 'ʰd'], 'e': ['e', 'eu', 'eʰ', 'eˀ', 'eː', 'ẽ', 'ẽː', 'ḛ', 'ḛ̃', 'o', 'œ', 'ɘ', 'ə', 'əː', 'ə̃', 'ə̃ː', 'ə̰̃', 'ə̰', 'ɚ', 'ɛ', 'ɛː', 'ɛ̃', 'ɛ̃ː', 'ɜ', 'ɝ', 'ɞ', 'ɵ', 'ɵː'], 'f': ['f', 'fʷ', 'ɟʝ', 'ɟ̰', 'ʄ'], 'g': ['ɠ', 'ɡ', 'ɡʷ', 'ɡː', 'ɡ̰', 'ɢ', 'ʛ'], 'h': ['h', 'hʲ', 'hʷ', 'h̃', 'ħ', 'ɥ', 'ɦ', 'ɧ', 'ʜ'], 'i': ['i', 'iʰ', 'iˀ', 'iː', 'ĩ', 'ĩː', 'ḭ', 'ḭ̃', 'ɨ', 'ɨi', 'ɨː', 'ɨ̃', 'ɨ̃ː', 'ɨ̘', 'ɨ̰', 'ɪ', 'ɪː', 'ɪ̃'], 'j': ['j', 'jʼ', 'jː', 'j̃', 'j̥', 'j̰', 'ɟ', 'ʝ', 'ʰj', 'ʰɟ'], 'k': ['k', 'kl', 'kp', 'kʰ', 'kʲ', 'kʲʰ', 'kʲʼ', 'kʷ', 'kʷʲ', 'kʷʼ', 'kʷː', 'kʷ̰', 'kʷ◌̰', 'kʼ', 'kː', 'kˣ', 'k̪', 'k̰', 'ƙ', 'ʰk', 'ʰkʷ'], 'l': ['l', 'lʲ', 'lʼ', 'lː', 'l̥', 'l̪', 'ƭ', 'ɫ', 'ɬ', 'ɭ', 'ɭʲ', 'ɮ', 'ɺ', 'ɺ̥', 'ʎ', 'ʟ'], 'm': ['m', 'mb', 'mbʲ', 'mp', 'mpʲ', 'mɸʲ', 'mʰ', 'mʲ', 'mʷ', 'mʼ', 'mː', 'm̥', 'm̰', 'ɱ', 'ʍ', 'ʰm'], 'n': ['N', 'n', 'nd', 'ndz', 'ndzʲ', 'ndʒ', 'ndʲ', 'ns', 'nsʲ', 'nt', 'nts', 'ntʃ', 'ntʲ', 'nʰ', 'nʲ', 'nː', 'n̥', 'n̪', 'n̰', 'ŋ', 'ŋk', 'ŋɡ', 'ŋɡʷ', 'ŋʷ', 'ŋ̥', 'ɲ', 'ɲʰ', 'ɲː', 'ɲ̥', 'ɲ̰', 'ɳ', 'ɳɖʐ', 'ɳʈʂ', 'ɴ', 'ʰn', 'ʰɲ'], 'o': ['o', 'oʰ', 'oʲ', 'oˀ', 'oː', 'õ', 'õʲ', 'õː', 'õ̰', 'o̝', 'o̰', 'ø', 'œ', 'œ̃', 'ɔ', 'ɔː', 'ɔ̃', 'ɔ̃ː', 'ɵ', 'ʘ', 'θ', 'σ'], 'p': ['p', 'ps', 'pʰ', 'pʲ', 'pʲʰ', 'pʷ', 'pʼ', 'pː', 'ƥ', 'ɸ', 'ɸʲ', 'φ'], 'q': ['q', 'qʰ', 'qʷ', 'qʼ'], 'r': ['r', 'r̥', 'ɹ', 'ɺ', 'ɻ', 'ɻ̥', 'ɽ', 'ɽʰ', 'ɾ', 'ɾʲ', 'ɾ̃', 'ʀ', 'ʁ', 'ʔɾ', 'ʙ', 'ʰɾ'], 's': ['s', 'sʰ', 'sʲ', 'sʼ', 's̺', 'ʂ', 'ʃ'], 't': ['s̪', 't', 'tk', 'ts', 'tsʰ', 'tsʲ', 'tsʲʰ', 'tsʼ', 'tʃ', 'tʃʰ', 'tʃʲ', 'tʃʼ', 'tʰ', 'tʲ', 'tʲʰ', 'tʲʼ', 'tʷ', 'tʼ', 'tː', 'tˣ', 't̪', 't̪ʙ', 't̪ʰ', 't̪ʼ', 't̰', 't̺', 't◌̰', 'ʈ', 'ʈʂ', 'ʈʂʰ', 'ʈʂʼ', 'ʈʰ', 'ʈʼ', 'ʰt', 'θ', 'θʲ'], 'u': ['u', 'uʰ', 'uˀ', 'uː', 'ũ', 'ũː', 'ṵ', 'ṵ̃', 'ɯ', 'ʉ', 'ʉː', 'ʉ̃', 'ʊ', 'ʊː', 'ʊ̃'], 'v': ['v', 'ʋ', 'ʌ', 'ʌː', 'ʌ̃', 'ʌ̃ː', 'μ', 'ⱱ'], 'w': ['w', 'wʰ', 'wʲ', 'wʼ', 'wː', 'w̃', 'w̥', 'w̰', 'ɯ', 'ɯi', 'ɯː', 'ɯ̃', 'ɯ̃ː', 'ɯ̰', 'ɰ', 'ʍ', 'ʔw', 'ʰw', 'ω'], 'x': ['x', 'xl', 'xʲ', 'xʷ', 'ɣ', 'χ', 'χʷ'], 'y': ['y', 'ỹ', 'ɣ', 'ɣʷ', 'ɤ', 'ɤː', 'ɤ̃', 'ʏ'], 'z': ['z', 'ɼ', 'ʐ', 'ʑ', 'ʒ', 'ʒ̺'], '?': ['ʔ', 'ʔʲ', 'ʕ', 'ʡ', 'ʢ'], '0': ['ø', 'øː', 'ø̃']};
const ipaCharToKeyStrokeMappingFileName = "ipa.json";
function readInIpaJSON(){
	var ipaCharToKeyStrokeMappingFile = new File(ipaCharToKeyStrokeMappingFileName);

// See if the file exists
	if(ipaCharToKeyStrokeMappingFile.exists()) {
		var keyStrokeToSymbols = {}
		const ipaCharToKeyStrokeMapping = require(ipaCharToKeyStrokeMappingFileName);
		ipaCharToKeyStrokeMapping.forEach((element) => {
			element["symbols"].forEach((symbolAndKeyPrompts) => {
				var symbol = symbolAndKeyPrompts["symbol"];
				var keyStrokeList = symbolAndKeyPrompts["key_prompts"];

			});
		});

	} else {
		return defaultIPAExtendedMapping;
	}
}

// ------------------------------------------------
// ------------------------------------------------
var started = 0;
var maps = {
	'IPA-Full' : {
		'a' : ['ɑ','æ','ɐ'],
		'b' : ['β','ɓ','ʙ'],
		'c' : ['ɕ','ç'],
		'd' : ['ð','ɖ','ɗ'],
		'e' : ['ə','ɚ','ɵ','ɘ'],
		'3' : ['ɛ','ɜ','ɝ','ɛ̃','ɞ'],
		'g' : ['ɠ','ɢ','ʛ','ɡ'],
		'h' : ['ɥ','ɦ','ħ','ɧ','ʜ'],
		'i' : ['ɪ','ɨ'],
		'j' : ['ʝ','ɟ','ʄ'],
		'l' : ['ɫ','ɬ','ʟ','ɭ','ɮ'],
		'm' : ['ɱ'],
		'n' : ['ŋ','ɲ','ɴ','ɳ'],
		'o' : ['ɔ','œ','ø','ɒ','ɶ'],
		'p' : ['ɸ'],
		'r' : ['ɾ','ʁ','ɹ','ɻ','ʀ','ɽ','ɺ'],
		's' : ['ʃ','ʂ'],
		't' : ['θ','ʈ'],
		'u' : ['ʊ','ʉ'],
		'v' : ['ʌ','ʋ','ⱱ'],
		'w' : ['ʍ','ɯ','ɰ'],
		'x' : ['χ'],
		'y' : ['ʎ','ɣ','ʏ','ɤ'],
		'z' : ['ʒ','ʐ','ʑ'],
		'?' : ['ʔ','ʕ','ʢ','ʡ'],
		' ' : ['d͡ʒ','t͡ʃ']
	},
	'IPA-Extended': readInIpaJSON(),
	'IPA-for-English' : {
		'a' : ['æ','ɑ','ɒ'],
		'c' : ['ɔ'],
		'd' : ['ð'],
		'e' : ['ə','ᵊ','ɚ','ɜ','ɛ','ɝ'],
		'i' : ['ɪ'],
		'l' : ['ɫ'],
		'n' : ['ŋ'],
		'r' : ['ʳ','ɹ','ɾ'],
		's' : ['ʃ'],
		't' : ['θ'],
		'u' : ['ʊ'],
		'v' : ['ʌ'],
		'z' : ['ʒ'],
		'?' : ['ʔ']
	}
}

// ------------------------------------------------
// ------------------------------------------------
var lang = {
	en : {
		label : 'English',
		_title : 'IPA Keyboard',
		_tagline : 'International Phonetic Alphabet Symbols.',
		_helper_desc : 'Press tab &#8677; to cycle through',
		_options_menu : 'Options Menu',
		_keyboard_type : 'Keyboard Type',
		_current_keys : 'Current Key Bindings',
		_ui_lang : 'UI Interface Language',
		_footer_created : 'Design &amp; development by',
		_placeholder : 'Hi there! Welcome to the IPA Keyboard. \nHere you can write your text using the International Phonetic Alphabet Symbols. \n\n - When the helper window appears, use the tab key to cycle through the special characters. \n - You can switch the Keyboard type by selecting it on the sidebar options menu. \n\nHappy IPA writing! \n@alterebro',
		_support_title : 'Support',
		_support_desc : 'The IPA Keyboard is a personal project still in development, help to make it better by sending your comments and bugs found to the developer (<a href="https://twitter.com/alterebro" target="_blank" title="Jorge Moreno. @alterebro">@alterebro</a>).<br />This App is free and doesn\'t have annoying ads of any kind, please consider making a donation to keep it this way if you get any value from it!',
		_support_donate : 'Donate via Paypal'
	},
	es : {
		label : 'Español',
		_title : 'Teclado AFI',
		_tagline : 'Alfabeto Fonético Internacional.',
		_helper_desc : 'Usa el Tabulador &#8677; para desplazarte',
		_options_menu : 'Menu de Opciones',
		_keyboard_type : 'Tipo de Teclado',
		_current_keys : 'Carácteres asociados',
		_ui_lang : 'Idioma de la Interface',
		_footer_created : 'Diseño y desarrollo por',
		_placeholder : 'Hola! Bienvenido al teclado AFI. \nAquí podrás escribir tus textos usando los simbolos del Alfabeto Fonético Internacional.\n\n - Cuando aparezca la ventana de ayuda, usa la tecla de tabulador para desplazarte por los carácteres.\n - Puedes cambiar el tipo de teclado seleccionandolo en el menu de opciones lateral. \n\nFeliz escritura AFI! \n@alterebro',
		_support_title : 'Colabora',
		_support_desc : 'El teclado AFI es un proyecto personal todavía en desarrollo, ayuda a hacerlo mejor mandando tus comentarios y los errores que puedas encontrar al desarrollador (<a href="https://twitter.com/alterebro" target="_blank" title="Jorge Moreno. @alterebro">@alterebro</a>).<br />Esta aplicación es gratis y no tiene molestos anuncios de ningún tipo, considera hacer un donativo para que siga siendo así en caso de que obtengas algún valor de su uso!',
		_support_donate : 'Donar via Paypal'
	}
}

// ------------------------------------------------
// ------------------------------------------------
var app_state = JSON.parse(localStorage.getItem('IPA-Keyboard-settings')) || {
	input_data : '',
	default_keymap : 'IPA-Extended',
	default_lang : 'en',
	menu_type_open : false,
	menu_keys_open : false,
	menu_lang_open : false,
	menu_help_open : false,
	sidebar_hidden : false
};
// Force language if found in URL > http:://url/path/?en
var url_lang = location.search.slice(1,3);
app_state.default_lang = (lang[url_lang] && (location.search.length ==3)) ? url_lang : app_state.default_lang;
var current_keymap = app_state.default_keymap;
var current_lang = app_state.default_lang;
// ------------------------------------------------
// ------------------------------------------------
// Example data for multiple text areas
var textAreasData = [
	{ id: 1, placeholder: "Text Area 1" },
	{ id: 2, placeholder: "Text Area 2" },
	{ id: 3, placeholder: "Text Area 3" },
	// Add more text areas as needed
];
textAreasData.forEach((textAreaData) => {
	// Create unique ID for each Vue instance
	var containerId = `app-${textAreaData.id}`;
	// Create a div container for each Vue instance
	var container = document.createElement('div');
	container.id = containerId;
	document.getElementById('app-container').appendChild(container);

	var data = {
		maps : maps,
		current_keymap : current_keymap,
		current_lang : current_lang,
		input : app_state.input_data,

		keymap : null,
		lang : null,
		langs : (function() {
			var langs = {};
			for ( var i in lang ) {
				langs[i] = lang[i]['label'];
			}
			return langs;
		})(),

		helper_chars : [],
		helper_chars_current : -1,
		helper_chars_origin : null,
		helper_coordinates : {
			top : 0,
			left : 0
		},
		helper_offset : {
			top : 0,
			left : 0
		},

		aside_menu_type_open : app_state.menu_type_open,
		aside_menu_keys_open : app_state.menu_keys_open,
		aside_menu_lang_open : app_state.menu_lang_open,
		aside_menu_help_open : app_state.menu_help_open,
		hide_sidebar : app_state.sidebar_hidden,

		metadata : {
			title : 'IPA Keyboard',
			description : 'IPA Keyboard. International Phonetic Alphabet Symbols Web Application.',
			url : 'https://git.io/ipa'
		},
		textarea : null,
	};

	// ------------------------------------------------
	// ------------------------------------------------
	new Vue({
		el :`#${containerId}`,
		data : data,
		template: `
      <div>
        <textarea
          rows="1"
          cols="5"
          id="textarea-${textAreaData.id}"
          v-model="input"
          @keyup="onKeyUp"
          @keypress="onKeyPress"
          @keydown="onKeyDown"
          :placeholder="placeholder"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          ref="textareaRef"
        ></textarea>
\t\t<div v-if="helper_chars.length" transition="dissolve" id="helper-${textAreaData.id}" v-bind:style="{ top: helper_coordinates.top + 'px', left: helper_coordinates.left + 'px' }">
\t\t\t<dl>
\t\t\t\t<dt v-html="lang._helper_desc">Press tab &#8677; to cycle through</dt>
\t\t\t\t<dd>
\t\t\t\t\t<template v-for="c in helper_chars">
\t\t\t\t\t\t<button
\t\t\t\t\t\t\t@click="replaceChar(c)"
\t\t\t\t\t\t\t:class="helper_chars[helper_chars_current] == c ? 'current' : ''">
\t\t\t\t\t\t\t{{ c }}
\t\t\t\t\t\t</button>
\t\t\t\t\t</template>
\t\t\t\t</dd>
\t\t\t</dl>
\t\t</div>
    `,
		mounted() {
			// Reference to the textarea element after it's mounted
			this.textarea = this.$refs.textareaRef;
			console.log('Mounted!', this.textarea);
			this.init();
			this.calc_helper_offset();
			this.create_placeholder();
			this.socialLinks();
			window.addEventListener('resize', this.closeHelper);
			window.setTimeout(function() {
				document.querySelector('body').classList.remove('preload');
			}, 2000);
		},
		computed: {
			placeholder() {
				return textAreaData.placeholder;
			},
		},

		// ------------------------
		filters : {
			beautify : function(str) {
				return str.replace(/-/g, ' ');
			},
			urlencode : function(str) {
				return encodeURIComponent(str);
			}
		},

		// ------------------------
		methods : {
			create_placeholder : function() {
				var _in = this.textarea;
				var p = this.lang._placeholder;
				var p_str = '';
				var counter = 0;
				var interval = window.setInterval(function() {
					p_str += p[counter];
					counter++;
					if ( counter >= (p.length) ) { clearInterval(interval); }
					_in.setAttribute('placeholder', p_str);
				}, 5);

				_in.focus();
			},

			calc_helper_offset : function() {
				var y = this.textarea.offsetTop;
					y += parseInt(get_style(this.textarea, 'font-size')) * 1.5;
					this.helper_offset.top = y;

				var x = this.textarea.offsetLeft;
					this.helper_offset.left = x + 10; // arbitrary 10

				this.helper_positioning(0, 0);
			},

			toogle_sidebar : function() {
				this.hide_sidebar = !this.hide_sidebar;
				this.saveAppState();
				this.closeHelper();
			},

			toggle_menu_type : function() {
				this.aside_menu_type_open = !this.aside_menu_type_open;
				this.saveAppState();
			},

			toggle_menu_keys : function() {
				this.aside_menu_keys_open = !this.aside_menu_keys_open;
				this.saveAppState();
			},

			toggle_menu_lang : function() {
				this.aside_menu_lang_open = !this.aside_menu_lang_open;
				this.saveAppState();
			},

			toggle_menu_help : function() {
				this.aside_menu_help_open = !this.aside_menu_help_open;
				this.saveAppState();
			},

			helper_positioning : function(x,y) {
				this.helper_coordinates.top = x + this.helper_offset.top;
				this.helper_coordinates.left = y + this.helper_offset.left;
			},

			onKeyDown : function() {},

			onKeyPress : function() {
				var caret = getCaretCoordinates(this.textarea, this.textarea.selectionEnd);
				this.helper_positioning( caret.top, caret.left );
				console.log("reached key press");
			},

			onKeyUp : function() {
				console.log("before save app state");
				this.saveAppState();
				console.log("befire helper chars");
				console.log(this.helper_chars);
				// Calc helper modal displacement
				if (this.helper_chars.length > 0) {
					var the_helper = document.querySelector(`#helper-${textAreaData.id}`);
					console.log(the_helper);
					var the_inner_helper = document.querySelector(`#helper-${textAreaData.id} dl`);
					console.log(the_inner_helper);
					var hhw = Math.round(parseInt( get_style(the_helper, 'width') ) / 2);
					var hl = this.helper_coordinates.left;
					var il = this.textarea.offsetLeft;

					var displacement = false;
					var displacement_value = 0;
					var calc_l = (hhw+il)-hl;
						if ( calc_l > 0 ) {
							displacement = true;
							displacement_value = (calc_l + 10);
						}
					var calc_r = this.textarea.offsetWidth - (hl+hhw-10);
						if ( calc_r < 0 ) {
							displacement = true;
							displacement_value = calc_r;
						}
					the_inner_helper.style.left = (displacement) ? displacement_value + 'px' : '0px';
				}
			},

			saveAppState : function() {
				var app_settings = {
					input_data : data.input,
					default_keymap : data.current_keymap,
					default_lang : data.current_lang,
					menu_type_open : data.aside_menu_type_open,
					menu_keys_open : data.aside_menu_keys_open,
					menu_lang_open : data.aside_menu_lang_open,
					menu_help_open : data.aside_menu_help_open,
					sidebar_hidden : data.hide_sidebar
				}
				localStorage.setItem('IPA-Keyboard-settings', JSON.stringify(app_settings));
			},


			addChar : function(c) {
				var s = this.textarea.selectionStart;
				this.input = data.input.substr(0,s) + c + data.input.substr(s);

				var lenC = c.length;
				this.setCaret(s+lenC);
				this.closeHelper();
				this.saveAppState();
				this.textarea.focus();
			},

			replaceChar : function(c) {
				var s = this.textarea.selectionStart;
				this.input = data.input.substr(0,s-1) + c + data.input.substr(s);
				var lenC = c.length;
				this.setCaret(s+lenC);
				this.closeHelper();
				this.saveAppState();
				this.textarea.focus();
			},

			setCaret : function(pos) {
				var _in = this.textarea;
				window.setTimeout(function(){
					_in.setSelectionRange(pos,pos);
				}, 1);
			},

			cycleHelperChar : function() {
				var cl = this.helper_chars.length;
				if( cl > 0 ) {
					console.log(this.helper_chars_current);
					var lenPrevChar = (this.helper_chars_current == -1 || this.helper_chars_current== (cl)) ? 1 : this.helper_chars[this.helper_chars_current].length;
					this.helper_chars_current = ( this.helper_chars_current++ >= (cl) ) ? 0 : this.helper_chars_current++;
					var c = (this.helper_chars_current == cl) ? this.helper_chars_origin : this.helper_chars[this.helper_chars_current];
					var s = this.textarea.selectionStart;
					this.input = data.input.substr(0,s-lenPrevChar) + c + data.input.substr(s);
					var lenC = c.length;
					this.setCaret(s+lenC);
				}
			},

			openHelper : function(chars) {
				this.helper_chars_current = -1;
				this.helper_chars = chars;
			},

			closeHelper : function() {
				this.helper_chars = [];
				this.helper_chars_current = -1;
			},

			socialLinks : function() {
				var social_links = document.querySelectorAll('#main footer ul li a');
				for (var i=0; i<social_links.length; i++) {
					social_links[i].onclick = function(e) {
						e.preventDefault();
						var network_window = window.open( this.href, this.getAttribute('data-network'), 'height=350,width=600');
						network_window.focus();
					}
				}
			},

			init : function() {
				data['keymap'] = data.maps[data.current_keymap];
				data['lang'] = lang[data.current_lang];
				var self = this;
				var input_element = this.textarea;

					Mousetrap.reset();
					if (!started) { // ?

						// Tab key
						Mousetrap(input_element).bind('tab', function(e, combo) {
							e.preventDefault();
							self.cycleHelperChar();
							//return false;
						});
					}

					// Delete key
					Mousetrap(input_element).bind(['space', 'backspace'], function(e, combo) {
						self.closeHelper();
					});

					// all keys...
					input_element.onkeypress = function(e) {
						var y = get_key(e);
						if ( !data.keymap[y] ) {
							self.closeHelper();
						}
					}

					// ... but keys on current mapping
					for ( k in data.keymap ) {
						Mousetrap(input_element).bind( k, function(e, combo) {
							self.helper_chars_origin = combo;
							self.openHelper( data.keymap[combo] );
						});
					}

				started = true;
			}
		}
	});
});

// Google Analytics Tracking ID
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-63335-24', 'auto');
ga('send', 'pageview');
