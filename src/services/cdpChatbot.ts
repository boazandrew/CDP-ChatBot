// Mock data for CDP documentation
const cdpDocs = {
    segment: {
      sources: {
        setup: "To set up a new source in Segment:\n1. Navigate to the Segment dashboard\n2. Click on 'Sources' in the left navigation\n3. Click 'Add Source' button\n4. Select the type of source you want to add\n5. Follow the configuration steps for your specific source type\n6. Save your configuration",
        types: ["Website", "Mobile App", "Server", "Cloud Apps"],
        configuration: "Each source type has different configuration options. For websites, you'll need to install the Segment snippet. For server-side, you'll use one of our server libraries."
      },
      destinations: {
        setup: "To add a destination in Segment:\n1. Go to the Segment dashboard\n2. Select your source\n3. Click on 'Add Destination'\n4. Search for and select your desired destination\n5. Configure the destination settings\n6. Enable the destination",
        popular: ["Google Analytics", "Mixpanel", "Facebook Pixel", "Amplitude"]
      },
      tracking: {
        events: "To track events in Segment, use the analytics.track() method with an event name and properties.",
        identify: "Use analytics.identify() to tie a user to their actions and record traits about them.",
        page: "The analytics.page() call records page views on your website.",
        group: "Use analytics.group() to associate individual users with a group."
      }
    },
    mparticle: {
      profiles: {
        create: "To create a user profile in mParticle:\n1. Use the mParticle SDK to identify the user\n2. Call the identify method with a user ID\n3. Add user attributes as needed\n4. The profile will be created automatically when data is sent",
        attributes: "User attributes can include demographics, preferences, and other user-specific data.",
        lookup: "You can look up user profiles in the mParticle dashboard under 'User Activity'."
      },
      events: {
        track: "To track events in mParticle, use the logEvent method with an event name, type, and attributes.",
        types: ["Navigation", "Search", "Transaction", "User Content", "User Preference", "Social", "Other"]
      },
      integrations: {
        setup: "To set up an integration in mParticle:\n1. Go to Setup > Outputs in the mParticle dashboard\n2. Click 'Add Output'\n3. Select the desired integration\n4. Configure the integration settings\n5. Activate the integration"
      }
    },
    lytics: {
      audiences: {
        build: "To build an audience segment in Lytics:\n1. Navigate to the Audiences section\n2. Click 'Create Audience'\n3. Define your audience criteria using the segment builder\n4. Use behavioral data, user attributes, or content affinity\n5. Save your audience\n6. Activate it to a destination if needed",
        types: ["Behavioral", "Demographic", "Technographic", "Content Affinity"],
        activation: "Audiences can be activated to various destinations like ad platforms, email systems, or your website."
      },
      campaigns: {
        create: "To create a campaign in Lytics:\n1. Go to the Campaigns section\n2. Click 'Create Campaign'\n3. Select a campaign type\n4. Define your audience\n5. Set up the campaign content and rules\n6. Activate the campaign"
      },
      integrations: {
        setup: "To set up an integration in Lytics:\n1. Navigate to the Integrations section\n2. Select the desired integration\n3. Follow the configuration steps\n4. Authorize the connection if required\n5. Save the integration settings"
      }
    },
    zeotap: {
      data: {
        integrate: "To integrate your data with Zeotap:\n1. Go to the Data Integration section\n2. Select your data source type\n3. Configure the connection settings\n4. Map your data fields to Zeotap's schema\n5. Set up the data transfer schedule\n6. Start the data import",
        sources: ["CRM", "Website", "Mobile App", "Offline", "Third-party"],
        mapping: "Data mapping ensures your data fields align with Zeotap's unified schema for proper integration."
      },
      identity: {
        resolution: "Zeotap's ID+ solution helps resolve identities across devices and channels.",
        setup: "To set up identity resolution:\n1. Navigate to the Identity section\n2. Configure your identity sources\n3. Set up matching rules\n4. Enable the identity resolution service"
      },
      audiences: {
        create: "To create an audience in Zeotap:\n1. Go to the Audience Builder\n2. Define your audience criteria\n3. Select attributes and behaviors\n4. Save your audience\n5. Activate it to your desired channels"
      }
    },
    comparisons: {
      audiences: "Segment focuses on data collection and routing, while Lytics and Zeotap have more advanced audience building capabilities. mParticle offers a middle ground with good audience features and strong mobile support.",
      integrations: "Segment has the largest ecosystem of integrations. mParticle excels in mobile integrations. Lytics focuses on marketing integrations. Zeotap specializes in advertising and identity integrations.",
      identity: "Zeotap has the strongest identity resolution capabilities. mParticle and Lytics also offer good identity management. Segment provides basic identity features but may require additional tools for advanced cases.",
      pricing: "Pricing models vary: Segment charges based on monthly tracked users (MTUs), mParticle on data volume, Lytics on features and scale, and Zeotap on custom enterprise agreements."
    }
  };
  
  // Function to extract code snippets from text
  const extractCodeSnippets = (text: string) => {
    const codeSnippets = [];
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    let match;
  
    while ((match = codeBlockRegex.exec(text)) !== null) {
      codeSnippets.push({
        language: match[1] || 'javascript',
        code: match[2].trim()
      });
    }
  
    // Remove code blocks from the text
    const cleanedText = text.replace(codeBlockRegex, '');
    
    return { cleanedText, codeSnippets };
  };
  
  // Function to generate a response based on the user's question
  const generateResponse = (question: string) => {
    const lowerQuestion = question.toLowerCase();
    
    // Check if the question is not related to CDPs
    if (!lowerQuestion.includes('segment') && 
        !lowerQuestion.includes('mparticle') && 
        !lowerQuestion.includes('lytics') && 
        !lowerQuestion.includes('zeotap') && 
        !lowerQuestion.includes('cdp') && 
        !lowerQuestion.includes('customer data platform') &&
        !lowerQuestion.includes('how do i') && 
        !lowerQuestion.includes('how can i') && 
        !lowerQuestion.includes('how to')) {
      return {
        text: "I'm specialized in answering questions about Customer Data Platforms (CDPs) like Segment, mParticle, Lytics, and Zeotap. Could you please ask a question related to these platforms? For example, you could ask how to set up a source in Segment or how to create an audience in Lytics.",
        codeSnippets: []
      };
    }
  
    // Handle Segment questions
    if (lowerQuestion.includes('segment')) {
      if (lowerQuestion.includes('source') || lowerQuestion.includes('set up a new source')) {
        return {
          text: `# Setting up a new source in Segment\n\n${cdpDocs.segment.sources.setup}\n\nSegment supports various source types including: ${cdpDocs.segment.sources.types.join(', ')}.\n\n${cdpDocs.segment.sources.configuration}`,
          codeSnippets: [{
            language: 'javascript',
            code: `// Example Segment website source implementation
  <script>
    !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="YOUR_WRITE_KEY";analytics.SNIPPET_VERSION="4.13.2";
    analytics.load("YOUR_WRITE_KEY");
    analytics.page();
    }}();
  </script>`
          }]
        };
      }
      
      if (lowerQuestion.includes('destination') || lowerQuestion.includes('add destination')) {
        return {
          text: `# Adding a destination in Segment\n\n${cdpDocs.segment.destinations.setup}\n\nPopular destinations include: ${cdpDocs.segment.destinations.popular.join(', ')}.`,
          codeSnippets: []
        };
      }
      
      if (lowerQuestion.includes('track') || lowerQuestion.includes('event')) {
        return {
          text: `# Tracking events in Segment\n\n${cdpDocs.segment.tracking.events}`,
          codeSnippets: [{
            language: 'javascript',
            code: `// Track an event
  analytics.track('Item Purchased', {
    item_id: 'p-123',
    item_name: 'Premium Subscription',
    price: 29.99,
    currency: 'USD'
  });`
          }]
        };
      }
      
      if (lowerQuestion.includes('identify') || lowerQuestion.includes('user')) {
        return {
          text: `# Identifying users in Segment\n\n${cdpDocs.segment.tracking.identify}`,
          codeSnippets: [{
            language: 'javascript',
            code: `// Identify a user
  analytics.identify('user-123', {
    name: 'John Doe',
    email: 'john.doe@example.com',
    plan: 'Premium',
    logins: 24
  });`
          }]
        };
      }
      
      return {
        text: "I see you're asking about Segment. Segment is a Customer Data Platform that helps you collect, clean, and control your customer data. Could you be more specific about what you'd like to know? For example, how to set up sources, add destinations, or track events?",
        codeSnippets: []
      };
    }
    
    // Handle mParticle questions
    if (lowerQuestion.includes('mparticle')) {
      if (lowerQuestion.includes('profile') || lowerQuestion.includes('create a user profile')) {
        return {
          text: `# Creating a user profile in mParticle\n\n${cdpDocs.mparticle.profiles.create}\n\n${cdpDocs.mparticle.profiles.attributes}\n\n${cdpDocs.mparticle.profiles.lookup}`,
          codeSnippets: [{
            language: 'javascript',
            code: `// Web SDK example
  mParticle.Identity.getCurrentUser().setUserAttribute('membership_level', 'premium');
  mParticle.Identity.getCurrentUser().setUserAttribute('last_purchase_date', '2023-04-01');
  
  // Identify the user
  const identityRequest = {
    userIdentities: {
      email: 'user@example.com',
      customerId: '123456'
    }
  };
  
  mParticle.Identity.identify(identityRequest);`
          }]
        };
      }
      
      if (lowerQuestion.includes('event') || lowerQuestion.includes('track')) {
        return {
          text: `# Tracking events in mParticle\n\n${cdpDocs.mparticle.events.track}\n\nEvent types include: ${cdpDocs.mparticle.events.types.join(', ')}.`,
          codeSnippets: [{
            language: 'javascript',
            code: `// Log a custom event
  const eventAttributes = {
    product_id: 'product-123',
    price: 29.99,
    category: 'Electronics'
  };
  
  mParticle.logEvent(
    'Product Viewed',           // Event name
    mParticle.EventType.Navigation,  // Event type
    eventAttributes             // Event attributes
  );`
          }]
        };
      }
      
      if (lowerQuestion.includes('integration') || lowerQuestion.includes('set up an integration')) {
        return {
          text: `# Setting up an integration in mParticle\n\n${cdpDocs.mparticle.integrations.setup}`,
          codeSnippets: []
        };
      }
      
      return {
        text: "I see you're asking about mParticle. mParticle is a Customer Data Platform that specializes in mobile and web data collection. Could you be more specific about what you'd like to know? For example, how to create user profiles, track events, or set up integrations?",
        codeSnippets: []
      };
    }
    
    // Handle Lytics questions
    if (lowerQuestion.includes('lytics')) {
      if (lowerQuestion.includes('audience') || lowerQuestion.includes('segment') || lowerQuestion.includes('build an audience')) {
        return {
          text: `# Building an audience segment in Lytics\n\n${cdpDocs.lytics.audiences.build}\n\nLytics supports various audience types including: ${cdpDocs.lytics.audiences.types.join(', ')}.\n\n${cdpDocs.lytics.audiences.activation}`,
          codeSnippets: []
        };
      }
      
      if (lowerQuestion.includes('campaign') || lowerQuestion.includes('create a campaign')) {
        return {
          text: `# Creating a campaign in Lytics\n\n${cdpDocs.lytics.campaigns.create}`,
          codeSnippets: []
        };
      }
      
      if (lowerQuestion.includes('integration') || lowerQuestion.includes('set up an integration')) {
        return {
          text: `# Setting up an integration in Lytics\n\n${cdpDocs.lytics.integrations.setup}`,
          codeSnippets: []
        };
      }
      
      return {
        text: "I see you're asking about Lytics. Lytics is a Customer Data Platform that specializes in audience building and campaign management. Could you be more specific about what you'd like to know? For example, how to build audience segments, create campaigns, or set up integrations?",
        codeSnippets: []
      };
    }
    
    // Handle Zeotap questions
    if (lowerQuestion.includes('zeotap')) {
      if (lowerQuestion.includes('integrate') || lowerQuestion.includes('data') || lowerQuestion.includes('integrate my data')) {
        return {
          text: `# Integrating data with Zeotap\n\n${cdpDocs.zeotap.data.integrate}\n\nZeotap supports various data sources including: ${cdpDocs.zeotap.data.sources.join(', ')}.\n\n${cdpDocs.zeotap.data.mapping}`,
          codeSnippets: []
        };
      }
      
      if (lowerQuestion.includes('identity') || lowerQuestion.includes('resolution')) {
        return {
          text: `# Setting up identity resolution in Zeotap\n\n${cdpDocs.zeotap.identity.resolution}\n\n${cdpDocs.zeotap.identity.setup}`,
          codeSnippets: []
        };
      }
      
      if (lowerQuestion.includes('audience') || lowerQuestion.includes('create an audience')) {
        return {
          text: `# Creating an audience in Zeotap\n\n${cdpDocs.zeotap.audiences.create}`,
          codeSnippets: []
        };
      }
      
      return {
        text: "I see you're asking about Zeotap. Zeotap is a Customer Data Platform that specializes in identity resolution and audience activation. Could you be more specific about what you'd like to know? For example, how to integrate your data, set up identity resolution, or create audiences?",
        codeSnippets: []
      };
    }
    
    // Handle comparison questions
    if (lowerQuestion.includes('compare') || lowerQuestion.includes('difference') || 
        (lowerQuestion.includes('segment') && (lowerQuestion.includes('mparticle') || lowerQuestion.includes('lytics') || lowerQuestion.includes('zeotap'))) ||
        (lowerQuestion.includes('mparticle') && (lowerQuestion.includes('lytics') || lowerQuestion.includes('zeotap'))) ||
        (lowerQuestion.includes('lytics') && lowerQuestion.includes('zeotap'))) {
      
      if (lowerQuestion.includes('audience')) {
        return {
          text: `# Comparing Audience Capabilities\n\n${cdpDocs.comparisons.audiences}`,
          codeSnippets: []
        };
      }
      
      if (lowerQuestion.includes('integration')) {
        return {
          text: `# Comparing Integration Capabilities\n\n${cdpDocs.comparisons.integrations}`,
          codeSnippets: []
        };
      }
      
      if (lowerQuestion.includes('identity')) {
        return {
          text: `# Comparing Identity Resolution Capabilities\n\n${cdpDocs.comparisons.identity}`,
          codeSnippets: []
        };
      }
      
      if (lowerQuestion.includes('price') || lowerQuestion.includes('pricing') || lowerQuestion.includes('cost')) {
        return {
          text: `# Comparing Pricing Models\n\n${cdpDocs.comparisons.pricing}`,
          codeSnippets: []
        };
      }
      
      return {
        text: "I see you're asking for a comparison between CDPs. Each platform has its strengths:\n\n- Segment excels in data collection and has the largest integration ecosystem\n- mParticle specializes in mobile data collection and has strong identity features\n- Lytics focuses on audience building and campaign management\n- Zeotap specializes in identity resolution and data enrichment\n\nCould you specify which aspect you'd like to compare? For example, audience capabilities, integrations, identity resolution, or pricing?",
        codeSnippets: []
      };
    }
    
    // Generic CDP questions
    if (lowerQuestion.includes('cdp') || lowerQuestion.includes('customer data platform')) {
      return {
        text: "A Customer Data Platform (CDP) is a software that collects and organizes data from various sources to create a unified customer database accessible to other systems. The four CDPs I can help with are:\n\n1. **Segment**: Known for its extensive integration ecosystem and data collection capabilities\n2. **mParticle**: Specializes in mobile data collection and customer journey analytics\n3. **Lytics**: Focuses on audience building and campaign management\n4. **Zeotap**: Specializes in identity resolution and data enrichment\n\nWhat specific CDP would you like to learn more about?",
        codeSnippets: []
      };
    }
    
    // Default response for how-to questions that don't match specific patterns
    if (lowerQuestion.includes('how do i') || lowerQuestion.includes('how can i') || lowerQuestion.includes('how to')) {
      return {
        text: "I can help with your how-to question, but I need more specific information about which CDP you're asking about (Segment, mParticle, Lytics, or Zeotap) and what exactly you're trying to accomplish. Could you please provide more details?",
        codeSnippets: []
      };
    }
    
    // Fallback response
    return {
      text: "I'm specialized in answering questions about Customer Data Platforms (CDPs) like Segment, mParticle, Lytics, and Zeotap. Could you please ask a question related to these platforms? For example, you could ask how to set up a source in Segment or how to create an audience in Lytics.",
      codeSnippets: []
    };
  };
  
  // Simulate API call delay
  const simulateApiDelay = () => {
    return new Promise(resolve => {
      const delay = Math.floor(Math.random() * 1000) + 500; // Random delay between 500-1500ms
      setTimeout(resolve, delay);
    });
  };
  
  // CDP Chatbot service
  export const cdpChatbot = {
    async getResponse(question: string) {
      // Simulate API call delay
      await simulateApiDelay();
      
      // Generate response
      const response = generateResponse(question);
      
      return response;
    }
  };