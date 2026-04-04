import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  // Handle kasus ketika ProjectLink kosong
  const handleLiveDemo = (e) => {
    if (!ProjectLink) {
      // ProjectLink kosong
      e.preventDefault();
      alert("Live demo link is not available");
    }
  };

  const handleDetails = (e) => {
    if (!id) {
      // ID kosong
      e.preventDefault();
      alert("Project details are not available");
    }
  };

  return (
    <div className="group relative w-full">
      <div className="relative overflow-hidden rounded-3xl glass-card transform transition-all duration-500 hover:scale-[1.02] hover:shadow-glow-purple">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 via-accent-blue/10 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>

        <div className="relative p-6 z-10">
          <div className="relative overflow-hidden rounded-2xl mb-4">
            <img
              src={Img}
              alt={Title}
              loading="lazy"
              className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gradient font-heading line-clamp-2">
              {Title}
            </h3>

            <p className="text-text-muted text-sm leading-relaxed line-clamp-3 font-body">
              {Description}
            </p>

            <div className="pt-4 flex items-center justify-between gap-3">
              {ProjectLink ? (
                <a
                  href={ProjectLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="glass-button px-4 py-2 text-accent-blue hover:text-text-primary transition-colors duration-200 flex items-center gap-2 text-sm font-medium"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-text-muted text-sm font-body">Demo Not Available</span>
              )}

              {id ? (
                <Link
                  to={`/project/${id}`}
                  onClick={handleDetails}
                  className="glass-button px-4 py-2 text-text-secondary hover:text-text-primary transition-all duration-200 flex items-center gap-2 text-sm font-medium hover:scale-105 active:scale-95"
                >
                  <span>Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="text-text-muted text-sm font-body">Details Not Available</span>
              )}
            </div>
          </div>

          <div className="absolute inset-0 glass-border rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;
