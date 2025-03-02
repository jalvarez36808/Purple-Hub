import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  DocumentTextIcon, 
  ClipboardDocumentListIcon,
  PhoneIcon,
  HeartIcon,
  ArrowUpIcon,
  DocumentPlusIcon,
  CheckCircleIcon,
  ClockIcon,
  PencilSquareIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);
  const [obituaryDrafts, setObituaryDrafts] = useState([]);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user);
        
        if (session?.user) {
          // Load completed tasks
          const { data: tasks } = await supabase
            .from('user_tasks')
            .select('*')
            .eq('user_id', session.user.id)
            .eq('status', 'completed')
            .order('completed_at', { ascending: false });

          setCompletedTasks(new Set(tasks?.map(task => task.task_id) || []));
          setRecentActivity(tasks?.slice(0, 5) || []);

          // Load obituary drafts
          const { data: drafts, error: draftsError } = await supabase
            .from('obituary_templates')
            .select('*')
            .eq('user_id', session.user.id)
            .order('updated_at', { ascending: false });

          if (draftsError) {
            console.error('Error loading drafts:', draftsError);
          } else {
            setObituaryDrafts(drafts || []);
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const deleteDraft = async (draftId) => {
    try {
      const { error } = await supabase
        .from('obituary_templates')
        .delete()
        .eq('id', draftId);

      if (error) {
        console.error('Error deleting draft:', error);
        return;
      }

      // Update the local state to remove the deleted draft
      setObituaryDrafts(drafts => drafts.filter(draft => draft.id !== draftId));
    } catch (error) {
      console.error('Error deleting draft:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#6266ea]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-[#6266ea] to-[#7c80ee] rounded-2xl p-6 sm:p-10 text-white mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Welcome Back{user?.email ? `, ${user.email.split('@')[0]}` : ''}</h1>
          <p className="text-white/80">Continue your journey with our guided assistance.</p>
          
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center">
                <CheckCircleIcon className="w-8 h-8 mr-3" />
                <div>
                  <div className="text-2xl font-bold">{completedTasks.size}</div>
                  <div className="text-sm text-white/80">Tasks Completed</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center">
                <ClockIcon className="w-8 h-8 mr-3" />
                <div>
                  <div className="text-2xl font-bold">14</div>
                  <div className="text-sm text-white/80">Days Active</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center">
                <DocumentTextIcon className="w-8 h-8 mr-3" />
                <div>
                  <div className="text-2xl font-bold">5</div>
                  <div className="text-sm text-white/80">Documents Saved</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center">
                <HeartIcon className="w-8 h-8 mr-3" />
                <div>
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm text-white/80">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link 
                    to="/checklist"
                    className="flex items-center p-4 bg-[#6266ea]/5 rounded-xl hover:bg-[#6266ea]/10 transition-colors duration-200"
                  >
                    <ClipboardDocumentListIcon className="w-8 h-8 text-[#6266ea] mr-3" />
                    <div>
                      <div className="font-semibold text-gray-900">Continue Checklist</div>
                      <div className="text-sm text-gray-600">Track your progress</div>
                    </div>
                  </Link>
                  <Link 
                    to="/documents"
                    className="flex items-center p-4 bg-[#6266ea]/5 rounded-xl hover:bg-[#6266ea]/10 transition-colors duration-200"
                  >
                    <DocumentPlusIcon className="w-8 h-8 text-[#6266ea] mr-3" />
                    <div>
                      <div className="font-semibold text-gray-900">Upload Documents</div>
                      <div className="text-sm text-gray-600">Store important files</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {recentActivity.length > 0 ? (
                    recentActivity.map((activity, index) => (
                      <div 
                        key={index}
                        className="flex items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            Completed: {activity.task_id}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(activity.completed_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No recent activity to show</p>
                  )}
                </div>
              </div>
            </div>

            {/* Obituary Drafts Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Obituary Drafts</h2>
                  <Link 
                    to="/learn/write-obituary"
                    className="text-sm text-[#6266ea] hover:text-[#4232c2] flex items-center"
                  >
                    <PencilSquareIcon className="w-4 h-4 mr-1" />
                    New Draft
                  </Link>
                </div>
                <div className="space-y-4">
                  {obituaryDrafts.length > 0 ? (
                    obituaryDrafts.map((draft) => (
                      <div
                        key={draft.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-[#6266ea]/5 transition-colors duration-200"
                      >
                        <Link
                          to={`/learn/write-obituary?draft=${draft.id}`}
                          className="flex-1 min-w-0"
                        >
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {draft.content.fullName || 'Untitled Draft'}
                          </div>
                          <div className="text-xs text-gray-500">
                            Last updated: {new Date(draft.updated_at).toLocaleDateString()}
                          </div>
                        </Link>
                        <div className="flex items-center gap-2 ml-4">
                          <Link
                            to={`/learn/write-obituary?draft=${draft.id}`}
                            className="p-2 text-[#6266ea] hover:bg-[#6266ea]/10 rounded-lg transition-colors duration-200"
                          >
                            <PencilSquareIcon className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this draft? This action cannot be undone.')) {
                                deleteDraft(draft.id);
                              }
                            }}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-500 text-sm">No drafts yet</p>
                      <Link 
                        to="/learn/write-obituary"
                        className="inline-block mt-2 text-[#6266ea] hover:text-[#4232c2] text-sm font-medium"
                      >
                        Create your first draft
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Support Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h2>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-[#6266ea]/5 rounded-lg">
                    <PhoneIcon className="w-5 h-5 text-[#6266ea] mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">24/7 Support Line</div>
                      <div className="text-xs text-gray-500">1-800-SUPPORT</div>
                    </div>
                  </div>
                  <Link
                    to="/support"
                    className="block text-center px-4 py-2 border border-[#6266ea] text-[#6266ea] rounded-lg hover:bg-[#6266ea] hover:text-white transition-colors duration-200"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>

            {/* Resources Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Resources</h2>
                <div className="space-y-3">
                  <Link 
                    to="/learn/determining-wishes"
                    className="block p-3 bg-[#6266ea]/5 rounded-lg hover:bg-[#6266ea]/10 transition-colors duration-200"
                  >
                    <div className="text-sm font-medium text-gray-900">Understanding Final Wishes</div>
                    <div className="text-xs text-gray-500">Guide to honoring wishes</div>
                  </Link>
                  <Link 
                    to="/learn/body-transportation"
                    className="block p-3 bg-[#6266ea]/5 rounded-lg hover:bg-[#6266ea]/10 transition-colors duration-200"
                  >
                    <div className="text-sm font-medium text-gray-900">Transport & Body Care</div>
                    <div className="text-xs text-gray-500">Important arrangements</div>
                  </Link>
                  <Link 
                    to="/learn/understanding-remains-options"
                    className="block p-3 bg-[#6266ea]/5 rounded-lg hover:bg-[#6266ea]/10 transition-colors duration-200"
                  >
                    <div className="text-sm font-medium text-gray-900">Remains & Documentation</div>
                    <div className="text-xs text-gray-500">Understanding your options</div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Support Us Card */}
            <div className="bg-gradient-to-r from-[#6266ea]/5 to-[#7c80ee]/5 rounded-xl shadow-sm border border-[#6266ea]/20 overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Support Our Mission</h2>
                <p className="text-sm text-gray-600 mb-4">Help us continue providing support to families in need.</p>
                <Link
                  to="/support-us"
                  className="block text-center px-4 py-2 bg-[#6266ea] text-white rounded-lg hover:bg-[#4232c2] transition-colors duration-200"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 