function getRidOfSomeShit(elt) {
	if (elt) {
		var attributeFilters = [
			/.*adbrite.*/mig
		];

		var nodeFilters = [
			/ispan/mi ,
			/adbrite/mi
		];

		var attributes = elt.attributes, children = elt.childNodes;

		for (var t = 0; t < nodeFilters.length; t++) {
			//console.log("ELT testing ", elt, " for ", nodeFilters[t].source);

			if (elt.tagName && nodeFilters[t].test(elt.tagName)) {
				console.log("node ", elt, " matched ", nodeFilters[t].source);

				elt.parentNode.removeChild(elt);
				break;
			}
		}

		if (elt && attributes) {
			for (var t = 0; t < attributeFilters.length; t++) {
				for (var i = 0; i < attributes.length; i++) {
					//console.log("ATTR testing ", elt.attributes[i], " for ", attributeFilters[t].source);

					var a = elt.attributes[i];

					if (a && a.value && a.name && (attributeFilters[t].test(a.name) || attributeFilters[t].test(a.value))) {
						console.log("atribute ", attributes[i], " matched ", attributeFilters[t].source);
						elt.removeAttribute(elt.attributes[i].name);
					}
				}
			}
		}

		if (elt.contentDocument || elt.contentWindow) {
			var fl = false, shitElt = (elt.contentDocument || elt.contentWindow);

			for (var i = 0; i < nodeFilters.length; i++) {
				var tags = shitElt.getElementsByTagName('html');

				if (tags) {
					var shitTag = tags[0];

					if (shitTag && shitTag.innerHTML && nodeFilters[i].test(shitTag.innerHTML	)) {
						console.log("node ", elt, " matched ", nodeFilters[t].source);
						fl = true;
						break;
					}
				}
			}

			if (fl) {
				elt.parentNode.removeChild(elt);
			} else {
				var shitNodes = shitElt.childNodes;

				for (var i = 0; i < shitNodes.length; i++) {
					getRidOfSomeShit(shitNodes[i]);
				}
			}
		}

		if (children) {
			for (var i = 0; i < children.length; i++) {
				getRidOfSomeShit(children[i]);
			}
		}
	}
}

window.onload = function() {
	getRidOfSomeShit(document);
}
