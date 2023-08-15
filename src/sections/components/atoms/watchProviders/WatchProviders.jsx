import React from 'react'
import './watchProviders.css'

// Component handling the display of provider logos
const WatchProviders = ({ watchProviders }) => {

    var providerLogos;

    // If the movie has watch providers, display them logo by logo
    if(watchProviders) {
        // Function to get the watch provider icons depending on the list, returning the html
        providerLogos = watchProviders.map((provider, index) => {
            // Extract the logo url from the provider object
            const logoUrl = `https://image.tmdb.org/t/p/w500${provider.logo_path}`;
    
            // Initialize the provider link
            let providerLink = "";
    
            // Switch case to link to known providers
            switch(provider.provider_name){
            case "Netflix":
                providerLink = "https://www.netflix.com/";
                break;
            
            case "Amazon Prime Video":
                providerLink = "https://www.primevideo.com/";
                break;
    
            case "Disney Plus":
                providerLink = "https://www.disneyplus.com/";
                break;
    
            case "Star Plus":
                providerLink = "https://www.starplus.com/";
                break;
    
            case "HBO Max":
                providerLink = "https://www.hbomax.com/";
                break;
    
            case "MUBI":
                providerLink = "https://mubi.com/";
                break;
    
            case "Crave":
                providerLink = "https://www.crave.ca/";
                break;
            
            case "Hulu":
                providerLink = "https://www.hulu.com/";
                break;
            // Null if the provider is not known
            default:
                providerLink = null;
                break;
            }
        
            return (
            <div key={index} className='logo_container'>
                {/* If the providerLink exists, make it clickable and send it to the specified website */}
                {providerLink ? (
                <a
                    href={providerLink}
                    target='_blank'
                    rel='noopener noreferrer'>
                    <img
                    key={index}
                    src={logoUrl}
                    alt={`${provider.provider_name} Logo`}
                    className="provider_logo"
                    />
                </a>
                ) : (
                <img
                    key={index}
                    src={logoUrl}
                    alt={`${provider.provider_name} Logo`}
                    className="provider_logo_unclickable"
                />
                )}
            </div>
            );
        });
    }

  return (
    <div className='watch_provider_logos'>
        {providerLogos}
    </div>
  )
}

export default WatchProviders