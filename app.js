const overrideLinks = () => {
  var links = document.getElementsByTagName('a');

  for (var i = 0; i < links.length; i++) {
    const link = links[i].getAttribute('href');
    if (link.includes('/p/')) {
      links[i].onclick = function (event) {
        window.location.href = link;
        return false;
      }
    }
  }
}

const presentationNodeObserver = new MutationObserver((mutations, observerInstance) => {
  for (let mutation of mutations) {
    if (mutation.type === 'childList') {
      for (let i = 0; i < mutation.addedNodes.length; ++i) {
        const node = mutation.addedNodes.item(i);
        if (node != null) {
          const attr = node.getAttribute('role');
          if (attr === 'presentation') {
            node.remove();
            return;
          }
        }
      }
    }
  }
});

const bodyStyleObserver = new MutationObserver((mutations, observerInstance) => {
  if (document.body.style.overflow !== "visible") {
    document.body.style.overflow = "visible";
  }
});

const loadMorePostsObserver = new MutationObserver((mutations, observerInstance) => {
  for (let mutation of mutations) {
    if (mutation.type === 'childList') {
      for (let i = 0; i < mutation.addedNodes.length; ++i) {
        const node = mutation.addedNodes.item(i);
        if (node != null) {
          const newLinks = node.getElementsByTagName('a');
          if (newLinks.length > 0) {
            console.log('overriding links..');
            overrideLinks();
          }
        }
      }

    }
  }
});

const app = () => {
  overrideLinks();

  presentationNodeObserver.observe(document, {
    childList: true,
    subtree: true,
  });

  bodyStyleObserver.observe(document.body, {
    attributes: true,
  });

  loadMorePostsObserver.observe(document, {
    childList: true,
    subtree: true,
  });
};

app();